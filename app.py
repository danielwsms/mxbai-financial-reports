import streamlit as st
from google import genai
import os
from dotenv import load_dotenv
from mixedbread import Mixedbread

load_dotenv()

st.set_page_config(page_title="Vision RAG", page_icon="🍞", layout="wide")


def load_config():
    mixedbread_api_key = os.getenv("MXBAI_API_KEY")
    google_api_key = os.getenv("GOOGLE_API_KEY")
    vector_store_ids_str = os.getenv("VECTOR_STORE_IDS")

    errors = []
    if not mixedbread_api_key:
        errors.append("MXBAI_API_KEY not found in .env file")
    if not google_api_key:
        errors.append("GOOGLE_API_KEY not found in .env file")
    if not vector_store_ids_str:
        errors.append("VECTOR_STORE_IDS not found in .env file")

    vector_store_ids = []
    if vector_store_ids_str:
        vector_store_ids = [
            id.strip() for id in vector_store_ids_str.split(",") if id.strip()
        ]

    return {
        "mixedbread_api_key": mixedbread_api_key,
        "google_api_key": google_api_key,
        "vector_store_ids": vector_store_ids,
        "errors": errors,
    }


def search_vector_stores(query, vector_store_ids, mixedbread_api_key, top_k=10):
    try:
        mxbai = Mixedbread(api_key=mixedbread_api_key)

        res = mxbai.vector_stores.search(
            query=query,
            vector_store_ids=vector_store_ids,
            top_k=top_k,
        )

        return {
            "data": [
                {
                    "position": chunk.position,
                    "value": chunk.value,
                    "content": chunk.content,
                    "score": chunk.score,
                    "file_id": chunk.file_id,
                    "filename": chunk.filename,
                    "vector_store_id": chunk.vector_store_id,
                }
                for chunk in res.data
            ]
        }
    except Exception as e:
        st.error(f"Error searching vector stores: {str(e)}")
        return None


def generate_answer_with_gemini(query, context_chunks, google_api_key):
    try:
        client = genai.Client(api_key=google_api_key)

        context = "\n\n".join(
            [
                chunk.get("content", "")
                for chunk in context_chunks
                if chunk.get("content")
            ]
        )

        prompt = f"""Based on the financial report information provided below, please provide a concise answer to the user's question, using only the first sentence.

QUESTION: {query}

RETRIEVED DOCUMENTS:
{context}

INSTRUCTIONS:
- Answer the question directly and concisely
- If the information is not available in the documents, state "This information is not available in the provided documents"
- Only use information explicitly stated in the documents"""

        response = client.models.generate_content(
            model="gemini-2.5-flash-preview-05-20", contents=prompt
        )

        return response.text
    except Exception as e:
        st.error(f"Error generating answer with Gemini: {str(e)}")
        return None


def main():
    st.title("Vision RAG over financial reports")

    config = load_config()

    if config["errors"]:
        for error in config["errors"]:
            st.info(error)

    with st.sidebar:
        st.header("Search Settings")
        top_k = st.slider(
            "Number of chunks to retrieve", min_value=1, max_value=20, value=10
        )

    query = st.text_input(
        "Ask your question:", placeholder="Enter your question here..."
    )

    if query:
        if config["errors"]:
            st.error("Please fix configuration errors before searching")
            return

        if not query:
            st.error("Please enter a search query")
            return

        st.divider()
        st.header("Retrieved Documents")

        with st.spinner("Searching through your documents..."):
            search_results = search_vector_stores(
                query, config["vector_store_ids"], config["mixedbread_api_key"], top_k
            )

        if search_results and "data" in search_results:
            chunks = search_results["data"]

            if chunks:
                cols_per_row = 10
                for i in range(0, len(chunks), cols_per_row):
                    cols = st.columns(cols_per_row)

                    for j, col in enumerate(cols):
                        chunk_index = i + j
                        if chunk_index < len(chunks):
                            chunk = chunks[chunk_index]

                            with col:
                                image_data = chunk.get("value")

                                if image_data:
                                    try:
                                        st.image(image_data, width=200)
                                    except:
                                        st.error("Could not display image")
                                else:
                                    st.info("No image found in this chunk")

                                score = chunk.get("score", 0)
                                st.metric("Score", f"{score:.3f}")

                st.divider()
                st.header("Answer")

                with st.spinner("Generating answer..."):
                    answer = generate_answer_with_gemini(
                        query, chunks, config["google_api_key"]
                    )

                if answer:
                    st.info(answer)
            else:
                st.warning(
                    "No relevant chunks found for your query. Try rephrasing your question or check your vector store content."
                )
        else:
            st.error(
                "Failed to search vector stores. Please check your API key and vector store IDs."
            )


if __name__ == "__main__":
    main()

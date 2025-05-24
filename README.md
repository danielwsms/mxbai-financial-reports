# Vision RAG over Financial Reports

A Streamlit application that enables intelligent question-answering over financial report documents using vision-based Retrieval-Augmented Generation (RAG).

## Features

- **Visual Document Search**: Search through financial report images and documents using natural language queries
- **AI-Powered Answers**: Get precise answers to financial questions using Google's Gemini 2.0 Flash model
- **Interactive Interface**: Clean, user-friendly Streamlit interface with adjustable search parameters
- **Multi-Document Support**: Search across multiple vector stores simultaneously

## Prerequisites

- Python 3.11+
- Mixedbread AI API key
- Google AI API key
- Financial report PDF files for ingestion

## Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mxbai-financial-reports
   ```

2. **Install dependencies**
   ```bash
   pip install streamlit google-genai python-dotenv mixedbread-ai
   ```

3. **Configure environment variables**
   Create a `.env` file in the root directory:
   ```env
   MXBAI_API_KEY=your_mixedbread_api_key
   GOOGLE_API_KEY=your_google_api_key
   VECTOR_STORE_IDS=store_id_1,store_id_2,store_id_3
   ```

4. **Prepare your financial documents**
   - Create a `data/` directory in the project root
   - Place your financial report PDF files in the `data/` folder

5. **Create and populate vector stores**
   ```bash
   python ingest.py
   ```
   This script will:
   - Create a new vector store for your financial reports
   - Upload all PDF files from the `data/` directory
   - Print the vector store ID (add this to your `.env` file)

6. **Run the application**
   ```bash
   streamlit run app.py
   ```

## Usage

1. Open the application in your browser (typically `http://localhost:8501`)
2. Enter your question about the financial reports in the text input
3. Adjust the number of document chunks to retrieve using the sidebar slider
4. View the retrieved document images and the AI-generated answer

## How It Works

1. **Query Processing**: Your question is processed and used to search through pre-indexed financial documents
2. **Document Retrieval**: The most relevant document chunks are retrieved from the vector stores
3. **Visual Display**: Retrieved document images are displayed in a grid layout with relevance scores
4. **Answer Generation**: Google's Gemini model analyzes the retrieved documents and generates a precise answer

"use server";

import { generateText } from "ai";
import google from "@/lib/google";
import { searchVectorStore } from "@/actions/search";
import { VectorStoreSearchResponse } from "@mixedbread/sdk/resources/index.mjs";

export interface SearchResult {
  answer: string;
  searchResults: VectorStoreSearchResponse;
  query: string;
}

export async function performSearch(query: string): Promise<SearchResult> {
  if (!query || !query.trim()) {
    throw new Error("Query is required");
  }

  const searchResults = await searchVectorStore(query);

  const context = searchResults.data
    .map((result: any) => `Document: ${result.filename}\n${result.content}`)
    .join("\n\n");

  const systemMessage = {
    role: "system" as const,
    content: `Answer the user's question precisely and directly using only the provided financial report information below.

RETRIEVED DOCUMENTS:
${context}

INSTRUCTIONS:
- Focus solely on the user's specific question
- Answer only what is asked - do not provide additional information or context
- Use only information from the provided documents
- If the answer is not in the documents, state "This information is not available in the provided documents"
- Be concise and direct
- Do not make assumptions or inferences beyond what is explicitly stated in the documents`,
  };

  const result = await generateText({
    model: google("gemini-2.0-flash"),
    messages: [systemMessage, { role: "user", content: query }],
  });

  return {
    answer: result.text,
    searchResults: searchResults,
    query: query,
  };
}

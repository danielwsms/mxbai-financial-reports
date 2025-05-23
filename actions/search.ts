"use server";

import mxbai from "@/lib/mxbai";

export async function searchVectorStore(query: string) {
  const res = await mxbai.vectorStores.search({
    query,
    vector_store_ids: [process.env.VECTOR_STORE_ID as string],
    top_k: 8,
    search_options: {
      return_metadata: true,
    },
  });

  return res;
}

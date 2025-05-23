import { Suspense } from "react";
import { performSearch } from "@/actions/rag";
import {
  SearchAnswerDisplay,
  SearchAnswerSkeleton,
  SearchAnswerEmpty,
} from "./search-answer-display";
import {
  SearchDocumentsDisplay,
  SearchDocumentsSkeleton,
  SearchDocumentsEmpty,
} from "./search-documents-display";

interface SearchAnswerContentProps {
  query: string;
}

async function SearchAnswerContent({ query }: SearchAnswerContentProps) {
  try {
    const searchResult = await performSearch(query);
    return <SearchAnswerDisplay searchResult={searchResult} />;
  } catch (error) {
    return (
      <div className="text-red-500 p-6 rounded-lg bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2">Search Error</h3>
        <p className="text-sm">
          {error instanceof Error ? error.message : "An unknown error occurred"}
        </p>
      </div>
    );
  }
}

interface SearchDocumentsContentProps {
  query: string;
}

async function SearchDocumentsContent({ query }: SearchDocumentsContentProps) {
  try {
    const searchResult = await performSearch(query);
    return <SearchDocumentsDisplay searchResult={searchResult} />;
  } catch (error) {
    return <SearchDocumentsEmpty />;
  }
}

interface SearchAnswerProps {
  query?: string;
}

export function SearchAnswer({ query }: SearchAnswerProps) {
  if (!query || !query.trim()) {
    return <SearchAnswerEmpty />;
  }

  return (
    <Suspense fallback={<SearchAnswerSkeleton />}>
      <SearchAnswerContent query={query} />
    </Suspense>
  );
}

interface SearchDocumentsProps {
  query?: string;
}

export function SearchDocuments({ query }: SearchDocumentsProps) {
  if (!query || !query.trim()) {
    return <SearchDocumentsEmpty />;
  }

  return (
    <Suspense fallback={<SearchDocumentsSkeleton />}>
      <SearchDocumentsContent query={query} />
    </Suspense>
  );
}

import { Skeleton } from "@/components/ui/skeleton";
import { DocumentChunk } from "@/components/document-chunk";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { SearchResult } from "@/lib/search";

interface SearchDocumentsDisplayProps {
  searchResult: SearchResult;
}

export function SearchDocumentsDisplay({
  searchResult,
}: SearchDocumentsDisplayProps) {
  const hasDocuments =
    searchResult.searchResults?.data &&
    searchResult.searchResults.data.length > 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Source Documents</CardTitle>
        <CardDescription>
          Relevant document chunks used to generate the answer
        </CardDescription>
      </CardHeader>
      <CardContent>
        {hasDocuments ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {searchResult.searchResults.data.map((chunk, index) => (
              <DocumentChunk
                key={`${chunk.file_id}-${chunk.position}-${index}`}
                chunk={chunk}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground py-12">
            No relevant documents found. Try a different search query.
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function SearchDocumentsSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Source Documents</CardTitle>
        <CardDescription>
          Relevant document chunks used to generate the answer
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-5/6" />
                  <Skeleton className="h-3 w-4/5" />
                  <Skeleton className="h-3 w-3/4" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function SearchDocumentsEmpty() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Source Documents</CardTitle>
        <CardDescription>
          Relevant document chunks used to generate the answer
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center text-muted-foreground py-12">
          Enter a search query to find relevant documents
        </div>
      </CardContent>
    </Card>
  );
}

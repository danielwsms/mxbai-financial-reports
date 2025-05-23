import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { SearchResult } from "@/lib/search";

interface SearchAnswerDisplayProps {
  searchResult: SearchResult;
}

export function SearchAnswerDisplay({
  searchResult,
}: SearchAnswerDisplayProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Answer</CardTitle>
        <CardDescription>
          LLM answer based on the retrieved documents
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="prose prose-sm max-w-none">
          <div className="whitespace-pre-wrap text-sm leading-relaxed">
            {searchResult.answer}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function SearchAnswerSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Answer</CardTitle>
        <CardDescription>
          LLM answer based on the retrieved documents
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-full" />
      </CardContent>
    </Card>
  );
}

export function SearchAnswerEmpty() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Answer</CardTitle>
        <CardDescription>
          LLM answer based on the retrieved documents
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center text-muted-foreground py-8">
          Enter a search query to get an LLM-based answer
        </div>
      </CardContent>
    </Card>
  );
}

import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

interface SearchFormProps {
  query?: string;
}

export function SearchForm({ query }: SearchFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Search</CardTitle>
        <CardDescription>
          Ask questions about your financial reports
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action="/">
          <Input
            name="query"
            defaultValue={query}
            placeholder="Ask a question about your reports (press Enter to search)"
            className="w-full"
          />
        </form>
      </CardContent>
    </Card>
  );
}

export function SearchFormSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Search</CardTitle>
        <CardDescription>
          Ask questions about your financial reports
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-10 w-full" />
      </CardContent>
    </Card>
  );
}

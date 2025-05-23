import { SearchForm } from "@/components/search/search-form";
import {
  SearchAnswer,
  SearchDocuments,
} from "@/components/search/search-results";

type SearchParams = Promise<{
  [key: string]: string | string[] | undefined;
}>;

export default async function DocumentSearchPage(props: {
  searchParams: SearchParams;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams.query as string;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="flex flex-col gap-6">
        <SearchForm query={query} />
        <SearchAnswer query={query} />
      </div>
      <div>
        <SearchDocuments query={query} />
      </div>
    </div>
  );
}

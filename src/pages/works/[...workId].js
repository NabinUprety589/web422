import { useRouter } from "next/router";
import useSWR from "swr";
import BookDetails from "../../components/BookDetails";
import PageHeader from "../../components/PageHeader";
import Error from "next/error";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Work() {
  const router = useRouter();
  const { workId } = router.query;

  const workKey = Array.isArray(workId) ? workId.join("/") : workId;

  const { data, error, isLoading } = useSWR(
    workKey ? `https://openlibrary.org/works/${workKey}.json` : null,
    fetcher
  );

  if (isLoading) return <div>Loading book details...</div>;
  if (error || !data) return <Error statusCode={404} />;

  return (
    <div className="container mt-5">
      <PageHeader text={data.title} />
      <BookDetails book={data} workId={workKey} />
    </div>
  );
}
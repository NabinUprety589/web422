import useSWR from "swr";
import Link from "next/link";
import { Card, Button } from "react-bootstrap";

const fetcher = url => fetch(url).then(res => res.json());

export default function BookCard({ workId }) {
  const { data, error } = useSWR(
    workId ? `https://openlibrary.org/works/${workId}.json` : null,
    fetcher
  );

  if (!data && !error) return <Card className="h-100"><Card.Body>Loading...</Card.Body></Card>;
  if (error) return <Card className="h-100"><Card.Body>Error fetching book.</Card.Body></Card>;

  const title = data.title || "N/A";
  const description = (data.description && typeof data.description === "object") 
                        ? data.description.value 
                        : (data.description || "No description available.");
  const shortDescription = description.length > 150 ? description.substring(0, 150) + "..." : description;

  return (
    <Card className="h-100">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>Work ID: {workId}</Card.Text>
        <Card.Text>{shortDescription}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <Link href={`/works/${workId}`} passHref legacyBehavior>
          <Button variant="outline-primary" size="sm">View Details</Button>
        </Link>
      </Card.Footer>
    </Card>
  );
}

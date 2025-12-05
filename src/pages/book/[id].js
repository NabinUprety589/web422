import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function BookDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [book, setBook] = useState(null);

  useEffect(() => {
    if (!id) return;
    fetch(`https://openlibrary.org/works/${id}.json`)
      .then(res => res.json())
      .then(data => setBook(data))
      .catch(err => console.error(err));
  }, [id]);

  if (!book) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth:"600px", margin:"50px auto" }}>
      <h1>{book.title}</h1>
      {book.description && (
        <p>{typeof book.description === "string" ? book.description : book.description.value}</p>
      )}
      {book.subjects && <p><strong>Subjects:</strong> {book.subjects.join(", ")}</p>}
      {book.first_publish_date && <p><strong>First Published:</strong> {book.first_publish_date}</p>}
      <button onClick={() => router.back()} style={{ marginTop:"20px" }}>Go Back</button>
    </div>
  );
}

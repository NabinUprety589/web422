
import { useEffect, useState } from "react";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    const fetchBooks = async () => {
      try {
        const res = await fetch(
          "https://openlibrary.org/search.json?author=Terry+Pratchett"
        );
        const data = await res.json();
        setBooks(data.docs.slice(0, 20)); 
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  if (loading) return <p>Loading books...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Terry Pratchett Books</h1>
      <ul>
        {books.map((book, idx) => (
          <li key={idx} style={{ marginBottom: "1rem" }}>
            <strong>{book.title}</strong>
            {book.first_publish_year && (
              <span> — First published: {book.first_publish_year}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}


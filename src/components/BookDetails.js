export default function BookDetails({ book }) {
  const coverUrl = book.cover_id
    ? `https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg`
    : "https://placehold.co/400x600?text=Cover+Not+Available";

  return (
    <div style={{ display: "flex", marginBottom: "20px" }}>
      <img src={coverUrl} alt={book.title} style={{ width: "150px", marginRight: "20px" }} />
      <div>
        <h3>{book.title}</h3>
        {book.author_name && <p>Author: {book.author_name.join(", ")}</p>}
        <p>First Published: {book.first_publish_year || "N/A"}</p>
      </div>
    </div>
  );
}

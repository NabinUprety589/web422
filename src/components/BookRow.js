export default function BookRow({ book, onClick }) {
  return (
    <tr onClick={onClick} style={{ cursor: "pointer" }}>
      <td style={{ border: "1px solid #000", padding: "8px" }}>{book.title}</td>
      <td style={{ border: "1px solid #000", padding: "8px" }}>
        {book.first_publish_year || "N/A"}
      </td>
    </tr>
  );
}

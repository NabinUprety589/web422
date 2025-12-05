import { useEffect, useState } from "react";

export default function FavouritesPage() {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    fetch("/api/favourites")
      .then(res => res.json())
      .then(data => setFavourites(data));
  }, []);

  return (
    <div>
      <h1>Favourite Books</h1>
      <table border="1">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Language</th>
            <th>First Publish Year</th>
          </tr>
        </thead>
        <tbody>
          {favourites.map((book) => (
            <tr key={book.key}>
              <td>{book.title}</td>
              <td>{book.author_name?.join(", ")}</td>
              <td>{book.language?.join(", ")}</td>
              <td>{book.first_publish_year}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

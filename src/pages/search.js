import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function SearchPage() {
  const router = useRouter();
  const [search, setSearch] = useState({ title: "", author: "", language: "", publishYear: "" });
  const [books, setBooks] = useState([]);
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("loggedIn")) {
      router.push("/login");
      return;
    }
    const storedFav = JSON.parse(localStorage.getItem("favourites") || "[]");
    setFavourites(storedFav);
  }, []);

  const handleSearch = async () => {
    const params = new URLSearchParams();
    if (search.author) params.append("author", search.author);
    if (search.title) params.append("title", search.title);
    if (search.language) params.append("language", search.language);
    if (search.publishYear) params.append("publish_year", search.publishYear);

    const url = `https://openlibrary.org/search.json?${params.toString()}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      setBooks(data.docs || []);
    } catch (err) {
      console.error(err);
      setBooks([]);
    }
  };

  const toggleFavourite = (book) => {
    let updatedFav;
    if (favourites.find(f => f.key === book.key)) {
      updatedFav = favourites.filter(f => f.key !== book.key);
    } else {
      updatedFav = [...favourites, book];
    }
    setFavourites(updatedFav);
    localStorage.setItem("favourites", JSON.stringify(updatedFav));
  };

  const isFavourite = (book) => favourites.some(f => f.key === book.key);

  return (
    <div style={{ maxWidth:"800px", margin:"50px auto" }}>
      <h1>Search Books</h1>
      <input placeholder="Author" value={search.author} onChange={e => setSearch({...search, author:e.target.value})} />
      <input placeholder="Title" value={search.title} onChange={e => setSearch({...search, title:e.target.value})} />
      <input placeholder="Language" value={search.language} onChange={e => setSearch({...search, language:e.target.value})} />
      <input placeholder="Publish Year" value={search.publishYear} onChange={e => setSearch({...search, publishYear:e.target.value})} />
      <button onClick={handleSearch}>Search</button>

      {books.length > 0 && (
        <>
          <table border="1" cellPadding="10" style={{ marginTop:"20px", width:"100%", borderCollapse:"collapse" }}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author(s)</th>
                <th>First Publish Year</th>
                <th>Language</th>
                <th>Favourite</th>
              </tr>
            </thead>
            <tbody>
              {books.map((b, i) => (
                <tr key={i}>
                  <td style={{ color: "blue", cursor: "pointer" }} 
                      onClick={() => router.push(`/book/${b.key.replace("/works/","")}`)}>
                    {b.title}
                  </td>
                  <td>{b.author_name ? b.author_name.join(", ") : "-"}</td>
                  <td>{b.first_publish_year || "-"}</td>
                  <td>{b.language ? b.language.join(", ") : "-"}</td>
                  <td>
                    <button 
                      onClick={() => toggleFavourite(b)}
                      style={{ backgroundColor: isFavourite(b) ? "gold" : "lightgray" }}
                    >
                      {isFavourite(b) ? "★" : "☆"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Favourites Page Link */}
          <div style={{ marginTop: "20px", textAlign: "right" }}>
            <button 
              onClick={() => router.push("/favourites")} 
              style={{ padding:"10px 20px", backgroundColor:"blue", color:"white", cursor:"pointer" }}
            >
              View Favourites
            </button>
          </div>
        </>
      )}
    </div>
  );
}

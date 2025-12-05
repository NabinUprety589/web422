import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function FavouritesPage() {
  const router = useRouter();
  const [favouritesList, setFavouritesList] = useState([]);
  const [mounted, setMounted] = useState(false); 

  useEffect(() => {
    setMounted(true); 
    if (!localStorage.getItem("loggedIn")) {
      router.push("/login");
      return;
    }

    const storedFav = JSON.parse(localStorage.getItem("favourites") || "[]");
    setFavouritesList(Array.isArray(storedFav) ? storedFav : []);
  }, [router]);

  if (!mounted) return null; 

  return (
    <div style={{ maxWidth: "800px", margin: "50px auto" }}>
      <h1>My Favourite Books</h1>

      {favouritesList.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: "20px" }}>No favourite books yet.</p>
      ) : (
        <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author(s)</th>
              <th>First Publish Year</th>
              <th>Language</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {favouritesList.map((b, i) => (
              <tr key={i}>
                <td
                  style={{ color: "blue", cursor: "pointer" }}
                  onClick={() => router.push(`/book/${b.key.replace("/works/", "")}`)}
                >
                  {b.title}
                </td>
                <td>{b.author_name ? b.author_name.join(", ") : "-"}</td>
                <td>{b.first_publish_year || "-"}</td>
                <td>{b.language ? b.language.join(", ") : "-"}</td>
                <td>
                  <button
                    onClick={() => {
                      const updated = favouritesList.filter(f => f.key !== b.key);
                      setFavouritesList(updated);
                      localStorage.setItem("favourites", JSON.stringify(updated));
                    }}
                    style={{ backgroundColor: "red", color: "white", cursor: "pointer" }}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

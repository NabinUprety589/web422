import { useState } from "react";

export default function BooksPage() {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [language, setLanguage] = useState("");
  const [year, setYear] = useState("");
  const [books, setBooks] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  async function searchBooks(e) {
    e.preventDefault();
    setErrorMsg("");

    if (!author || !title || !subject || !language || !year) {
      setErrorMsg("Please fill ALL fields before searching.");
      return;
    }

    const params = new URLSearchParams({
      author,
      title,
      subject,
      language,
      first_publish_year: year,
    });

    const url = `https://openlibrary.org/search.json?${params.toString()}`;
    console.log("URL →", url);

    const res = await fetch(url);
    const data = await res.json();
    setBooks(data.docs || []);
  }

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h2>Search for Books</h2>

      <form onSubmit={searchBooks}>
        
        <div style={{ marginBottom: 12 }}>
          <label><b>Author:</b></label><br />
          <input 
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            style={{ width: "100%", padding: 8 }}
            placeholder="Enter author"
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label><b>Title:</b></label><br />
          <input 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: "100%", padding: 8 }}
            placeholder="Enter title"
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label><b>Subject:</b></label><br />
          <input 
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            style={{ width: "100%", padding: 8 }}
            placeholder="Enter subject"
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label><b>Language Code:</b></label><br />
          <input 
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            style={{ width: "100%", padding: 8 }}
            placeholder="e.g. eng"
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label><b>Published Year:</b></label><br />
          <input 
            value={year}
            onChange={(e) => setYear(e.target.value)}
            style={{ width: "100%", padding: 8 }}
            placeholder="e.g. 1995"
          />
        </div>

        <button 
          type="submit" 
          style={{ padding: "10px 16px", fontSize: 16 }}
        >
          Search
        </button>
      </form>

      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}

      <table 
        border="1" 
        cellPadding="8"
        style={{ width: "100%", marginTop: 20, borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th>Title</th>
            <th>Author(s)</th>
            <th>Language</th>
            <th>Published</th>
          </tr>
        </thead>

        <tbody>
          {books.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                Fill all fields and search.
              </td>
            </tr>
          ) : (
            books.map((b, i) => (
              <tr key={i}>
                <td>{b.title}</td>
                <td>{b.author_name?.join(", ")}</td>
                <td>{b.language?.join(", ")}</td>
                <td>{b.first_publish_year}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

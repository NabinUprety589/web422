
export async function fetchBooks({ author, title, subject, language, year, page = 1 }) {
  try {
    const params = new URLSearchParams();
    if (author) params.append("author", author);
    if (title) params.append("title", title);
    if (subject) params.append("subject", subject);
    if (language) params.append("language", language);
    if (year) params.append("first_publish_year", year);
    params.append("page", page);
    params.append("limit", 10);

    const url = `https://openlibrary.org/search.json?${params.toString()}`;

    const res = await fetch(url);
    if (!res.ok) return [];
    const data = await res.json();


    return data.docs.map((doc) => ({
      key: doc.key,
      title: doc.title,
      first_publish_year: doc.first_publish_year,
      author_name: doc.author_name,
      cover_id: doc.cover_i,
    }));
  } catch (err) {
    console.error(err);
    return [];
  }
}

import BookDetails from "../components/BookDetails";
import PageHeader from "../components/PageHeader";

export async function getStaticProps() {
  const res = await fetch("https://openlibrary.org/works/OL453657W.json");
  const book = await res.json();

  return {
    props: { book },
  };
}

export default function About({ book }) {
  return (
    <>
      <PageHeader text="About Me & My Book" />

      <div className="container mb-4">
        <p>
          Hi, my name is <b>Nabin Uprety</b>. I chose the book{" "}
          <b>{book.title}</b> because it is one of my favorites.
        </p>
      </div>

      <BookDetails book={book} />
    </>
  );
}

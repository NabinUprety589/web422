import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import PageHeader from "@/components/PageHeader";
import BookCard from "@/components/BookCard";

export default function Favourites() {
  const [favouritesList] = useAtom(favouritesAtom);

  return (
    <div className="container mt-5">
      {favouritesList.length > 0 ? (
        <>
          <PageHeader text="Favourites" subtext="Your favourite books" />
          <div className="row gy-4">
            {favouritesList.map(workId => (
              <div className="col-lg-3 col-md-6" key={workId}>
                <BookCard workId={workId} />
              </div>
            ))}
          </div>
        </>
      ) : (
        <PageHeader text="Nothing Here" subtext="Add a book to your favourites" />
      )}
    </div>
  );
}

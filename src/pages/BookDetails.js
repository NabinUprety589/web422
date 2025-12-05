
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { addToFavourites, removeFromFavourites } from "@/lib/userData";

export default function BookDetails({ book }) {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(false);

  useEffect(() => {
    setShowAdded(favouritesList?.includes(book.id));
  }, [favouritesList, book.id]);

  const favouritesClicked = async () => {
    if (showAdded) {
      const updatedList = await removeFromFavourites(book.id);
      setFavouritesList(updatedList);
    } else {
      const updatedList = await addToFavourites(book.id);
      setFavouritesList(updatedList);
    }
  };

  return (
    <div>
      <h2>{book.title}</h2>
      <p>{book.description}</p>
      <button onClick={favouritesClicked}>
        {showAdded ? "Remove from Favourites" : "+ Favourite"}
      </button>
    </div>
  );
}

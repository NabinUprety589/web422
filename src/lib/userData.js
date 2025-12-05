
import { getToken } from "@/lib/authenticate";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function addToFavourites(id) {
  try {
    const res = await fetch(`${API_URL}/favourites/${id}`, {
      method: "PUT",
      headers: { Authorization: `JWT ${getToken()}`, "Content-Type": "application/json" },
    });
    if (res.status === 200) return await res.json();
    return [];
  } catch (err) { console.error(err); return []; }
}

export async function removeFromFavourites(id) {
  try {
    const res = await fetch(`${API_URL}/favourites/${id}`, {
      method: "DELETE",
      headers: { Authorization: `JWT ${getToken()}`, "Content-Type": "application/json" },
    });
    if (res.status === 200) return await res.json();
    return [];
  } catch (err) { console.error(err); return []; }
}

export async function getFavourites() {
  try {
    const res = await fetch(`${API_URL}/favourites`, {
      method: "GET",
      headers: { Authorization: `JWT ${getToken()}`, "Content-Type": "application/json" },
    });
    if (res.status === 200) return await res.json();
    return [];
  } catch (err) { console.error(err); return []; }
}

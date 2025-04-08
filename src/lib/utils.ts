import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility to combine class names
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// TMDB: Get cast & crew credits
export async function getCredits(id: string, mediaType: "movie" | "tv") {
  const res = await fetch(
    `https://api.themoviedb.org/3/${mediaType}/${id}/credits?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
  );
  if (!res.ok) throw new Error("Failed to fetch credits");
  return res.json();
}

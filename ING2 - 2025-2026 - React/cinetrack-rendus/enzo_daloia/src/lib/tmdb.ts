const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export async function searchMovies(query: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
  );

  const data = await res.json();
  return data.results;
}
import { useEffect, useState } from "react";

const KEY = "c6108e17";

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  useEffect(
    function() {
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?s=${query}&apikey=${KEY}`,
            { signal: controller.signal },
          );

          if (!res.ok)
            throw new Error("Something went wrong, please try again later");
          const data = await res.json();
          if (data.Response === "False") throw new Error("No movie found");
          setMovies(data.Search);
          setError("");
        } catch (error) {
          if (error.name !== "AbortError") {
            setError(error.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      // handleCloseMovie();
      fetchMovies();

      return function() {
        controller.abort();
      };
    },
    [query],
  );
  return { movies, isLoading, error };
}

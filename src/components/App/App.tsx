// import css from "./App.css";
import SearchBar from "../SearchBar/SearchBar";
import movieService from "../../services/movieService";
import { useState } from "react";
import type { Movie } from "../../types/movie";
import toast from "react-hot-toast";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const handleSubmit = async (movie: string) => {
    try {
      setIsLoading(true);
      setIsError(false);
      const fetchMovies = await movieService(movie);
      if (fetchMovies.length === 0) {
        toast.error("No movies found for your request.");
      }
      setMovies(fetchMovies);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SearchBar onSubmit={handleSubmit} />
      {/* {isLoading && } */}
    </>
  );
}

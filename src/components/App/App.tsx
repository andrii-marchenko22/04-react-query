// import css from "./App.css";
import SearchBar from "../SearchBar/SearchBar";
import movieService from "../../services/movieService";
import { useState } from "react";
import type { Movie } from "../../types/movie";
import toast from "react-hot-toast";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

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

  const handleSelectMovie = (movieId: number) => {
    const movie = movies.find((movie) => movie.id === movieId);
    if (movie) {
      setSelectedMovie(movie);
      setIsModalOpen(!isModalOpen);
    }
  };

  return (
    <>
      <SearchBar onSubmit={handleSubmit} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {movies.length > 0 && (
        <MovieGrid onSelect={handleSelectMovie} movies={movies} />
      )}
      {isModalOpen && selectedMovie && (
        <MovieModal
          onClose={() => {
            setIsModalOpen(false);
            setSelectedMovie(null);
          }}
          movie={selectedMovie}
        />
      )}
    </>
  );
}

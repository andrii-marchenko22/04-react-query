import "./App.css";
import SearchBar from "../SearchBar/SearchBar";
import movieService from "../../services/movieService";
import { useState, useEffect } from "react";
import type { Movie } from "../../types/movie";
import { Toaster, toast } from "react-hot-toast";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const [query, setQuery] = useState("");
  const [currentPage, setCuurentPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["movie", query, currentPage],
    queryFn: () => movieService(query, currentPage),
    enabled: query !== "",
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.total_pages ?? 0;

  useEffect(() => {
    if (data && data.results.length === 0) {
      toast.error("No movies found for your request.");
    }
  }, [data, query]);

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setCuurentPage(1);
  };

  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {data && data.results.length > 0 && (
        <MovieGrid onSelect={handleSelectMovie} movies={data.results} />
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
      <Toaster />
    </>
  );
}

import axios from "axios";
import type { Movie } from "../types/movie";
const token = import.meta.env.VITE_TMDB_TOKEN;

interface MovieProps {
  results: Movie[];
}

const movieService = async (movie: string): Promise<Movie[]> => {
  const { data } = await axios.get<MovieProps>(
    "https://api.themoviedb.org/3/search/movie",
    {
      params: { query: movie },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data.results;
};

export default movieService;

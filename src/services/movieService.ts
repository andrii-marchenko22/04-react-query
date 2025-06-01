import axios from "axios";
import type { Movie } from "../types/movie";
const token = import.meta.env.VITE_TMDB_TOKEN;

interface MovieProps {
  results: Movie[];
  total_pages: number;
}

const movieService = async (
  movie: string,
  page: number
): Promise<MovieProps> => {
  const { data } = await axios.get<MovieProps>(
    "https://api.themoviedb.org/3/search/movie",
    {
      params: { query: movie, page },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

export default movieService;

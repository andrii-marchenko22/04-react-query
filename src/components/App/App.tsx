// import css from "./App.css";
import SearchBar from "../SearchBar/SearchBar";
import movieService from "../../services/movieService";

export default function App() {
  const handleSubmit = (movie: string) => {
    try {
      const res = movieService();
    } catch (error) {
    } finally {
    }
  };

  return (
    <>
      <SearchBar onSubmit={handleSubmit} />
    </>
  );
}

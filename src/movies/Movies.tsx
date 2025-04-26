import { useEffect, useState } from "react";

type Movie = {
  id: number;
  title: string;
  description: string;
  releaseDate: string;
  rating: number;
};

const Movies = () => {
 
  const [movies, setMovies] = useState<Movie[]>(() => {
    const storedMovies = localStorage.getItem("movies");
    console.log("Läser från localStorage:", storedMovies);
    return storedMovies ? JSON.parse(storedMovies) : [];
  });

  const [selectedMovie, setSelectedMovie] = useState<Movie>({
    id: 0,
    title: "",
    description: "",
    releaseDate: "",
    rating: 0,
  });

  useEffect(() => {
    console.log("Sparar till localStorage", movies);
    localStorage.setItem("movies", JSON.stringify(movies));
  }, [movies]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSelectedMovie((prev) => ({
      ...prev,
      [name]: name === "rating" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedMovie.title.trim() === "") return;

    const newMovie = {
      ...selectedMovie,
      id: Date.now(),
    };

    console.log("Submitting new movie:", newMovie);

    setMovies((prev) => {
      const updated = [...prev, newMovie];
      console.log("Updated movie list:", updated);
      return updated;
    });

    setSelectedMovie({
      id: 0,
      title: "",
      description: "",
      releaseDate: "",
      rating: 0,
    });
  };
  const deleteMovie = (id: number) => {
    setMovies((prev) => prev.filter((movie) => movie.id !== id));
  };

  return (
    <section className="flex flex-col justify-center items-center gap-8">
      <h1 className="text-2xl font-bold">IMDB Clone</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gp-4 items-center justify-center"
      >
        <label>Movie Title</label>
        <input
          type="text"
          name="title"
          placeholder="Movie Title..."
          value={selectedMovie.title}
          onChange={handleChange}
          className="border p-2 rounded-md"
          required
        />

        <label>Description</label>
        <input
          type="text"
          name="description"
          placeholder="Description..."
          value={selectedMovie.description}
          onChange={handleChange}
          className="border p-2 rounded-md"
          required
        />
        <label>Release Date</label>
        <input
          type="text"
          name="releaseDate"
          placeholder="Release Date..."
          value={selectedMovie.releaseDate}
          onChange={handleChange}
          className="border p-2 rounded-md"
          required
        />
        <label>Rating</label>
        <input
          type="number"
          name="rating"
          placeholder="Rating..."
          onChange={handleChange}
          value={selectedMovie.rating}
          className="border p-2 rounded-md"
          max={10}
          min={0}
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md mt-4 hover:bg-blue-700 transition duration-300"
        >
          Add Movie
        </button>
      </form>

      <div>
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="flex flex-col gap-2 p-4 border rounded-lg shadow-md bg-white mt-4"
          >
            <h2 className="text-xl font-bold">{movie.title}</h2>
            <p>{movie.description}</p>
            <p>Release Date: {movie.releaseDate}</p>
            <p>Rating: {movie.rating}</p>
            <span onClick={() => deleteMovie(movie.id)}>X</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Movies;

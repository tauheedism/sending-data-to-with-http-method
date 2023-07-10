import React, { Fragment, useState } from "react";
import MovieList from "./components/MovieList";
const App = () => {
  const [movies, setMovies] = useState([]);

  const fetchMoviesHandler = async () => {
    const response = await fetch("https://swapi.py4e.com/api/films/");
    const data = await response.json();
    const transformedMovies = data.results.map((movieData) => {
      return {
        id: movieData.episode_id,
        title: movieData.title,
        openingText: movieData.opening_crawl,
        releaseDate: movieData.release_data,
      };
    });
    setMovies(transformedMovies);
  };

  return (
    <Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        <MovieList movies={movies} />
      </section>
    </Fragment>
  );
};

export default App;

import React, { Fragment, useState } from "react";
import MovieList from "./components/MovieList";
const App = () => {
  const [movies, setMovies] = useState([]);
  const [isLoader,setIsLoader]=useState(false)

  const fetchMoviesHandler = async () => {
    setIsLoader(true)
    const response = await fetch("https://swapi.py4e.com/api/films/");
    const data = await response.json();
    const transformedMovies = data.results.map((movieData) => {
      var options = { year: 'numeric', month: 'long', day: 'numeric' };
      const formattedDate = new Date(movieData.release_date).toLocaleDateString([],options);
      return {
        id: movieData.episode_id,
        title: movieData.title,
        openingText: movieData.opening_crawl,
        releaseDate: formattedDate,
        director:movieData.director,
      };
    });
    setMovies(transformedMovies);
    setIsLoader(false)
  console.log(data.results);
  };


  

  return (
    <Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {isLoader?'loading.....':<MovieList movies={movies} />}
      </section>
    </Fragment>
  );
};

export default App;

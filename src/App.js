import React, { Fragment, useCallback, useEffect, useState } from "react";
import MovieList from "./components/MovieList";
const App = () => {
  const [movies, setMovies] = useState([]);
  const [isLoader,setIsLoader]=useState(false);
  const [error,setError]=useState(null);
  const [stop,setStop]=useState(null)

  const fetchMoviesHandler = useCallback( async () => {
    setIsLoader(true);
    setError(null);
    setStop(null);

    try {
      const response = await fetch("https://swapi.py4e.com/api/films/");
    if (!response.ok) {
      throw new Error("Something is wrong please retry")
    }
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
  // console.log(data.results);
      
} catch (error) {
  setError(error.message);
  // const interval = setInterval(async() => {
  //   await fetch("https://swapi.py4e.com/api/films/");
  // }, 1000);
  // setStop(interval);
  setIsLoader(false);
}
}, [])

    
    useEffect(()=>{
      fetchMoviesHandler()
    },[fetchMoviesHandler]);
    // const response = await fetch("https://swapi.py4e.com/api/films/");
    // const data = await response.json();
    // const transformedMovies = data.results.map((movieData) => {
    //   var options = { year: 'numeric', month: 'long', day: 'numeric' };
    //   const formattedDate = new Date(movieData.release_date).toLocaleDateString([],options);
    //   return {
    //     id: movieData.episode_id,
    //     title: movieData.title,
    //     openingText: movieData.opening_crawl,
    //     releaseDate: formattedDate,
    //     director:movieData.director,
    //   };
    // });
    // setMovies(transformedMovies);
    // setIsLoader(false)
  // console.log(data.results);
  // };

const stopRetryingHandler=()=>{
  console.log(stop);
  clearInterval(stop)
}
  
let content=<p>Found no movies</p>;
if(movies.length>0){
  content=<MovieList movies={movies} />
}
if (error) {
  content=<p>{error}</p>
}
if (isLoader) {
  content = <p>Loading...</p>;
}
  return (
    <Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
        <button onClick={stopRetryingHandler}>Calcel</button>
      </section>
      <section>
        {isLoader?'loading.....':<MovieList movies={movies} />}
      </section>
      <section>{content}</section>
    </Fragment>
  );
};

export default App;

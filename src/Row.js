import React, { useEffect, useState } from 'react';
import axios from './axios';
import './Row.css';

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);

  // A snippet of code that runs based on a specific condition/variable
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  console.table(movies);

  return (
    <div className="row" >
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map(movie => (
          <img
            key={movie.id}
            src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
            alt={movie.name}
            className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
          />
        ))}
      </div>
    </div>
  )
}

export default Row
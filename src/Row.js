import React, { useEffect, useState } from 'react';
import axios from './axios';
import './Row.css';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState('');

  // A snippet of code that runs based on a specific condition/variable
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  // console.table(movies);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1
    }
  }

  const handleClick = (movie) => {
    if (trailerUrl) {
      // if video is alsready playing, then onClick close it
      setTrailerUrl('');
    } else {
      // condition in case name is not present
      movieTrailer(movie?.name || "").then((url) => {
        //  below lines gives us the video id
        const urlParams = new URLSearchParams(URL(url).search);
        setTrailerUrl(urlParams.get('v'));
      }).catch((error) => console.log(error));
    }
  }
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
            onClick={() => handleClick(movie)}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  )
}

export default Row
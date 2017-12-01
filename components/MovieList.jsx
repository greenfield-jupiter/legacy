import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const MovieList = ({ movies, fetchMovie }) => {

  const renderMovieList = () => {
    if (movies) {
      const movieList = movies.filter(mov => mov.Poster !== "N/A").map(movie => {
      const title = movie.Title.replace(' ', '+');
      const year = movie.Year;
        return (
          <Link to={`/moviedetails/${movie.imdbID}/${title}`} key={movie.imdbID}>
            <div>
              <img src={movie.Poster} alt={movie.title} />
              <h2>{movie.Title}</h2>
            </div>
          </Link>
        );
      });
      return movieList;
    } else {
      return (
        <div />
      )
    }
  }

  return (
    <div className="movie-list-grid">
      {renderMovieList()}
    </div>
  );
}

MovieList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
  })),
  fetchMovie: PropTypes.func.isRequired,
};

export default MovieList;

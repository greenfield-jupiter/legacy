import React from 'react';
import SearchBarContainer from '../containers/SearchBarContainer';
import MovieListContainer from '../containers/MovieListContainer';

const Home = () => {
  return (
    <div>
      <SearchBarContainer />
      <MovieListContainer />
    </div>
  );
}

export default Home; 
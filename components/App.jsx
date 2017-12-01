import React from 'react';
import NavBar from './NavBar.jsx';
import MovieListContainer from '../containers/MovieListContainer';

const App = (props) => {
  return (
    <div>
      {props.children}
      {console.log('PROPS.CHILDREN: ', props.children)}
    </div>
  );
}

export default App; 

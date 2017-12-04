import React from 'react';
import NavBar from './NavBar.jsx';

const App = (props) => {
  console.log('PROPS CHILDRENITOS')
  console.log(props.children);
  return (
    <div className="search-grid-container">
      <div className="nav-bar-container">
        <NavBar />
      </div>
      <div className="body-container">
        {props.children}
      </div>
    </div>  
  );
}

export default App; 

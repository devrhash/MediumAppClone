import React from 'react';
import PostList from './PostList';
import './MainComponent.css';

const MainComponent = () => {
  return (
    <div className="main-container">
      <div className="left-container">
        <PostList />
      </div>
      <div className="right-container">
        <div className="filters-search">
          <h2>Filters</h2>
          <h1>hello</h1>
          <h2>Search Boxes</h2>
          {/* Add search boxes here */}
        </div>
      </div>
    </div>
  );
};

export default MainComponent;

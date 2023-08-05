import React from 'react';
import './Banner.css';

const Banner = ({ text }) => {
  return (
    <div className="banner">
        <div className='inner-box-left'>
            <h1>Stay Curious.</h1>
            <h2>Discover New Stories</h2>
            <h3>Start Reading Now</h3>
        </div>
        <div className='inner-box-right'>
            <h1>Write It Down Now</h1>
            <h2>Before You Forget!!!</h2>
        </div>
      
    </div>
  );
};

export default Banner;

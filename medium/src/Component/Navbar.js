import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a className="logo" href="/">Medium</a>
        <div className="menu">
          <a href="/">Home</a>
          <a href="/add">Write</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

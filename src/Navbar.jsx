import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link to="/" className="navbar-brand">Home</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item p-3">
              <Link to="/registration" className="nav-link">Registration</Link>
            </li>
            <li className="nav-item p-3">
              <Link to="/rating" className="nav-link">Rating</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
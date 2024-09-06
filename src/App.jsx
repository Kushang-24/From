import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import RegistrationForm from './components/RegistrationForm';
import RatingForm from './components/RatingForm';
import Home from './components/Home';

const App = () => {
  return (
    <div className="conatiner">
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<RegistrationForm />} />
        <Route path="/rating" element={<RatingForm />} />
      </Routes>
    </Router>
    </div>
  );
};

export default App;
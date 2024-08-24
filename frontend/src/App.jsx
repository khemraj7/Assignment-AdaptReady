import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import DishDetailsPage from './pages/DishDetailsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dish/:id" element={<DishDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;

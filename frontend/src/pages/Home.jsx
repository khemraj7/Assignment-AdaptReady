import React from 'react';
import Header from '../components/Header';
import DishList from '../components/DishList';
import DishSuggester from '../components/DishSuggester';
import './Home.css';

function Home() {
  return (
    <div>
      <Header />
      <DishSuggester />
      <DishList />
    </div>
  );
}

export default Home;

import React, { useState } from 'react';
import axios from 'axios';
import './DishSuggester.css';

const DishSuggester = () => {
  const [ingredients, setIngredients] = useState([]);
  const [suggestedDishes, setSuggestedDishes] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showPagination, setshowPagination] = useState(false);
  const [error, setError] = useState(null);
 const RootURL = "http://localhost:3000"
  const handleSuggest = () => {
    setLoading(true);
    axios.post(RootURL +'/api/dishes/suggest', { ingredients, page, limit })
      .then(response => {
        setSuggestedDishes(response.data.dishes);
        setTotalPages(response.data.totalPages);
        setLoading(false);
        setshowPagination(true)
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  };

  const handleIngredientChange = (event) => {
    if (event.key === 'Enter' && event.target.value) {
      setIngredients([...ingredients, event.target.value]);
      event.target.value = '';
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    handleSuggest();
  };

  const handleLimitChange = (event) => {
    setLimit(Number(event.target.value));
    setPage(1); // Reset to first page when changing limit
    handleSuggest();
  };

  return (
    <div className="dish-suggester">
      <h2>Dish Suggester</h2>
      <input
        type="text"
        placeholder="Enter ingredients and press Enter"
        onKeyPress={handleIngredientChange}
        className="ingredient-input"
      />
      <button onClick={handleSuggest} className="suggest-button">Suggest Dishes</button>
      {showPagination && <div className="limit-selector">
        <label>
          Limit:
          <select value={limit} onChange={handleLimitChange} className="limit-dropdown">
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
          </select>
        </label>
      </div>}
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}
     {showPagination && <ul className="dish-list">
        {suggestedDishes.map(dish => (
          <li key={dish.Srno} className="dish-item">{dish.RecipeName}</li>
        ))}
      </ul>}
  {  showPagination &&  <div className="pagination-controls">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="pagination-button"
        >
          Previous
        </button>
        <span className="pagination-info">Page {page} of {totalPages}</span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className="pagination-button"
        >
          Next
        </button>
      </div>}
    </div>
  );
};

export default DishSuggester;

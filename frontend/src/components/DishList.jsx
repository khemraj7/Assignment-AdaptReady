import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './DishList.css';

function DishList() {
  const [dishes, setDishes] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const RootURL = "http://localhost:3000";

  useEffect(() => {
    axios.get(`${RootURL}/api/dishes`, { params: { page, limit } })
      .then(response => setDishes(response.data.dishes))
      .catch(error => console.error(error));
  }, [page, limit]);

  return (
    <div className="dish-list-container">
      <h2 className="dish-list-title">Dishes List</h2>
      <table className="dish-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Preparation Time</th>
            <th>Cooking Time</th>
          </tr>
        </thead>
        <tbody>
          {dishes.length > 0 && dishes.map(dish => (
            <tr key={dish.Srno}>
              <td>
                <Link to={`/dish/${dish.Srno}`} className="dish-link">{dish.RecipeName}</Link>
              </td>
              <td>{dish.PrepTimeInMins} min</td>
              <td>{dish.CookTimeInMins} min</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-buttons">
        <button onClick={() => setPage(prevPage => Math.max(prevPage - 1, 1))}>Previous</button>
        <button onClick={() => setPage(prevPage => prevPage + 1)}>Next</button>
      </div>
    </div>
  );
}

export default DishList;

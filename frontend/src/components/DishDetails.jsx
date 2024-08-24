import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DishDetail.css";

function DishDetails({ dishId }) {
  const [dish, setDish] = useState(null);
  const RootURL = "http://localhost:3000";
  useEffect(() => {
    axios
      .get(`${RootURL}/api/dishes/${dishId}`)
      .then((response) => setDish(response.data))
      .catch((error) => console.error(error));
  }, [dishId]);

  if (!dish) return <p>Loading...</p>;

  return (
    <div className="dish-detail">
      <h2 className="dish-name">{dish.RecipeName}</h2>
      <div className="dish-info">
        <p>
          <strong>Ingredients:</strong> {dish.Ingredients}
        </p>
        <p>
          <strong>Diet Type:</strong> {dish.Diet}
        </p>
        <p>
          <strong>Preparation Time:</strong> {dish.PrepTimeInMins}
        </p>
        <p>
          <strong>Cooking Time:</strong> {dish.CookTimeInMins}
        </p>
        <p>
          <strong>Course:</strong> {dish.Course}
        </p>
        <p>
          <strong>Cuisine:</strong> {dish.Cuisine}
        </p>
      </div>
    </div>
  );
}

export default DishDetails;

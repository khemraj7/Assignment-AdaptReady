import React from 'react';
import { useParams } from 'react-router-dom';
import DishDetails from '../components/DishDetails';
import './DishDetailsPage.css';

const DishDetailsPage = () => {
  const { id } = useParams(null);

  return <DishDetails dishId={id} />;
};

export default DishDetailsPage;

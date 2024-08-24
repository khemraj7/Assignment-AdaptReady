import React, {useEffect, useState} from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {

const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
 const RootURL = "http://localhost:3000"
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    axios.get(RootURL+'/api/dishes', { params: { search: event.target.value } })
      .then(response => setResults(response.data.dishes))
      .catch(error => console.error(error));
  };
  return (
    <header className="header">
      <h1>Indian Cuisine Explorer</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search for dishes"
      />
      <ul>
        {results.map(result => (
          <li key={result.id}>
            <Link to={`/dish/${result.Srno}`}>{result.RecipeName}</Link>
          </li>
        ))}
      </ul>

    </header>
  );
};

export default Header;

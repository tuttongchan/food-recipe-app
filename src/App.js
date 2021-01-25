import React, { useState } from 'react';
import Axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import Recipe from './components/Recipe';
import Alert from './components/Alert';

export const App = () => {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [alert, setAlert] = useState('');

  const APP_ID = 'ea616e7f';

  const APP_KEY = '2e63fdf4a46db5cf3aa925bf2b571b93	';

  const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  const getData = async () => {
    if (query !== '') {
      const res = await Axios.get(url);
      if (!res.data.more) {
        return setAlert('No food with such name');
      }
      setRecipes(res.data.hits);
      console.log(res);
      setAlert('');
      setQuery('');
    } else {
      setAlert('Please fill the form');
    }
  };

  const onChange = (e) => {
    setQuery(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    getData();
  };

  return (
    <div className="App">
      <h1 onClick={getData}>🧀 Goated Foods 🐐</h1>

      <form className="search-form" onSubmit={onSubmit}>
        {alert !== '' && <Alert alert={alert} />}
        <input
          type="text"
          placeholder="Search Food"
          autoComplete="off"
          onChange={onChange}
          value={query}
        />
        <input type="submit" value="search" />
      </form>
      <div className="recipes">
        {recipes !== [] &&
          recipes.map((recipe) => <Recipe key={uuidv4()} recipe={recipe} />)}
      </div> 
    </div>
  );
};

export default App;

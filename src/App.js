
import React, { useState } from "react";
import {v4 as uuidv4} from 'uuid';
import Axios from 'axios';
import './App.css';
import Alert from "./components/Alert";

import Recipe from "./components/Recipe";

function App() {

  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [alert, setAlret] = useState("");

  const APP_ID = "dca1d81b";
  const APP_KEY = "4f50d7d1e361da7cce8b214282674af8";
  const url =`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=3&calories=591-722&health=alcohol-free`;


  const getData = async () => {

    if(query !== ""){
      const result = await Axios.get(url);

      if(!result.data.more) {
        return setAlret("No Food with such name");
      }

      console.log("The Axios : " , result);

      setRecipes(result.data.hits);
      setQuery("");
      setAlret("");
    } else {
      setAlret("Please fill the form");
    }
    
  }

    const onSubmit = (e) => {
      e.preventDefault();

      getData();
    }

    const onChange = (e) => {
   
      setQuery(e.target.value);
    }

  return (
   <div className="App">
     
     <h1 onClick={getData}>FOOD Search App</h1>

     <form className="search-form" onSubmit={onSubmit}>
       {alert !== "" && <Alert alert={alert} />}
       <input type="text" placeholder="Search Food" onChange={onChange}
        value={query}
        autoComplete="off"/>
       <input type="submit" value="search"/>
     </form>
     <div className="recipes">
        {recipes !== [] &&
          recipes.map(recipe => <Recipe key={uuidv4()} recipe={recipe} />)}
      </div>
    
   </div>
  );
}

export default App;

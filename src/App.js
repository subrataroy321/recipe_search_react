
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import SearchIcon from '@material-ui/icons/Search';

const REACT_APP_ID = process.env.REACT_APP_ID;
const REACT_APP_KEY = process.env.REACT_APP_KEY;
const REACT_APP_URL = process.env.REACT_APP_URL;

const App = () => {
  const [searchStr, setSearchStr] = useState("")
  const [searchQuery, setSearchQuery] = useState("chicken");
  const [foundReceipes, setFoundReceipes] = useState();
  const [searchNum, setSearchNum] = useState(15);


  useEffect(()=> {
    getRecipes()
  },[searchQuery, searchNum])

  const getRecipes = async () => {
    await axios
      .get(`${REACT_APP_URL}?q=${searchQuery}&app_id=${REACT_APP_ID}&app_key=${REACT_APP_KEY}&from=0&to=${searchNum}`)
      .then(res => {setFoundReceipes(res.data.hits);})
      .catch(err => console.log("Error", err))
  }

  return (
    <div className="main">
      {console.log(foundReceipes)}
      <div class="content-wrapper">

        {/* <!-- Main content --> */}
        <section class="content">
            <div class="container-fluid">
                <h2 class="text-center display-4">Recipe Search</h2>
                <div class="row">
                    <div class="col-md-8 offset-md-2">
                        <form action="simple-results.html">
                            <div class="input-group">
                                <input type="search" class="form-control form-control-lg" placeholder="Search here" onChange={(e) => setSearchStr(e.target.value)}/>
                                <div class="input-group-append">
                                    <button type="submit" class="btn btn-lg btn-primary" onClick={()=> setSearchQuery(searchStr)}>
                                        <SearchIcon />
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
      </div>
      { 
        foundReceipes 
        ?
        <div className="search-result-comtainer">
          <div className="container">
            {foundReceipes.map((recipe, i) => 
              <div className="each-result shadow p-3 mb-5 bg-body rounded">
                <div className="text-center" style={{width: "18rem"}} key={i}>
                  <img src={recipe.recipe.image} className="img-top" alt={recipe.recipe.label} />
                  <div className="card-body">
                    <h3 className="card-title">{recipe.recipe.label}</h3>
                    <div className="card-text">
                      <p><b>Calories:</b> {parseInt(recipe.recipe.calories)} cal</p>
                      <p><b>Dish Type:</b> {recipe.recipe.dishType}</p>
                      <p><b>Cusine Type:</b> {recipe.recipe.cuisineType}</p>
                      <p><b>Diet Labels:</b> {recipe.recipe.dietLabels}</p>
                      <a href={recipe.recipe.url}>See More</a>
                    </div>
                    <a href="#" className="btn btn-success " style={{marginTop: "20px"}}>Add to Cart</a>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div >
            <input type="button" className="btn btn-primary text-center" style={{width: "40%", marginBottom: "30px"}} value="Get more results" onClick={()=> setSearchNum(searchNum+9)}/>
          </div>
        </div>
        :
        <p>Search for Exciting Recipes</p>
      }
    </div>
  );
}

export default App;

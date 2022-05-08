import React, { useEffect, useState } from "react";
import PokeCard from './PokeCard';
import axios from 'axios';
import {v4 as uuidv4} from 'uuid';
import { Typography, CircularProgress, Box } from "@mui/material";


const Main = () => {
  // hooks
  const [value, setValue] = useState("");
  const [chefs, setChefs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const apiRequest = async () => {
      try {
        if (value !== "") {
          const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${value}`);
          const data = await response.data;
          setIsLoading(false);
          setChefs([data, ...chefs]);
        } else if (value === "") {
          setIsLoading(false);
        }
      } catch (err) {
        setIsLoading(false);
        console.log(err);
      }
    }
    apiRequest();
    // eslint-disable-next-line
  }, [value]); // listens changes on value

  const debounce = (callBack) => { 
    let timeout;
    return (...args) => { // Returns a function which is executed each time the debounce is called
      const context = this;
      clearTimeout(timeout); // Clears timeout if it exists
      // Applies the callback function to it by giving it the correct "this" context and arguments
      timeout = setTimeout(() => callBack.apply(context, args), 1500);
      setIsLoading(true);
    };
  }
  
  const handleChange = event => {
    let inputValue = event.target.value;
    setValue(inputValue)
  }
  
  const cards = () => {
    if (chefs) {
      return chefs.map((chef) => (<PokeCard key={uuidv4()} data={chef} className={"card-container"} ></PokeCard>));
    }
  }

  return <div className="main">
    <Typography gutterBottom variant="h3" component="div" sx={{mt: 4}}>Search a pokemon</Typography>
    <input type="text" name="input" onChange={debounce(handleChange)}/>
    {isLoading ? <Box sx={{ display: 'flex', mt: 3 }}><CircularProgress size={100} /></Box> : ''}
    {chefs.length > 0 ? cards() : ""} {/* Renders PokeCards if chefs has any value */}
  </div>;
};

export default Main;

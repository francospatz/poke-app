import React, { useEffect, useState } from "react";
import PokeCard from './PokeCard';
import axios from 'axios';
import { Typography } from "@mui/material";

const Main = () => {
  // hooks
  const [value, setValue] = useState("");
  const [chefs, setChefs] = useState([]);

  useEffect(() => {
    const apiRequest = async () => {
      try {
        if (value !== "") {
          const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${value}`);
          const data = await response.data;
          setChefs([data, ...chefs]);
          setValue("");
        }
      } catch (err) {
        console.log(err);
      }
    }
    apiRequest();
  }, [value]); // listens changes on value

  const handleSubmit = (event) => {
    event.preventDefault();
    let inputValue = event.target.input.value;
    setValue(inputValue.toLowerCase());
    event.target.input.value = "";
  };

  const cards = () => {
    if (chefs) {
      return chefs.map((chef) => (<PokeCard data={chef} className={"card-container"}></PokeCard>));
    }
  }

  return <div className="main">
    <Typography gutterBottom variant="h3" component="div" sx={{mt: 4}}>Search a pokemon</Typography>
    <form onSubmit={handleSubmit}>
      <input type="text" name="input" />
      {/* <button type="submit">Search</button> */}
    </form>
    {chefs.length > 0 ? cards() : ""}
  </div>;
};

export default Main;

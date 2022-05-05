import React from "react";
import { Card, Typography, CardMedia, CardContent } from "@mui/material";

const PokeCard = (props) => {
  return <Card sx={{width: 500, margin: 3}}>
    <Typography gutterBottom variant="h5" component="div" sx={{mt: 3}}>{props.data.name.toUpperCase()}</Typography>
    <CardMedia sx={{width: 96, ml: 25}}
        component="img"
        image={props.data.sprites.front_default}
        alt={props.data.name.toUpperCase()}
      />
    <CardContent>
      {props.data.stats.map(stat => {return <Typography gutterBottom variant="body2" color="black">{stat.stat.name}: {stat.base_stat}</Typography>})}
    </CardContent>
    
  </Card>;
};

export default PokeCard;

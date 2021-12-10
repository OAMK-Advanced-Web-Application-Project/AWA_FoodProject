import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";

export default function Restaurantmenu() {
  let { idrestaurant } = useParams();

    useEffect(() => {
        Axios.get(Constants.API_ADDRESS + "/")
    })

  return <div>{idrestaurant}</div>;
}

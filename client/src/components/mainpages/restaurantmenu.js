import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import Constants from "../Constants.json";
import styles from "./searchView.module.css";

export default function Restaurantmenu() {
  let { idrestaurant } = useParams();
  const [menuobject, setMenuObject] = useState();

  useEffect(() => {
    Axios.get(Constants.API_ADDRESS + `/restaurantById/${idrestaurant}`).then(
      (response) => {
        console.log(response.data);
        setMenuObject(response.data);
      }
    );
  }, []);

  return <div>{menuobject && menuobject.map((menu, idmenu) => {
      return (
          <div key={idmenu} className={styles.restaurant}>
              <h2>{menu.productname}</h2>
              <h3>{menu.description}</h3>
              <h3>{menu.price}</h3>
          </div>
      )
  })}</div>;
}
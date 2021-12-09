import Axios from "axios";
import React, { useState, useEffect } from "react";
import styles from "./searchView.module.css";
import Constants from "../Constants.json";

export default function SearchResult() {
  const [restaurantShow, setRestaurantShow] = useState();

  useEffect(() => {
    const Idata = async (event) => {
      event.preventDefault();
      const result = await Axios.get(
        Constants.API_ADDRESS + "/fetchData/restaurants",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      const restaurantArray = result.data;
      const restaurantShow = restaurantArray.map((elem) => ({
        id: elem.idrestaurant,
        restaurantname: elem.restaurantname,
        type: elem.type,
        pricelevel: elem.pricelevel,
      }));
      console.log(restaurantShow);
      setRestaurantShow(restaurantShow);
    };
    window.addEventListener("load", Idata);
  })
  
  return (
    <div className={styles.restaurant}>
      {" "}
      <div>
        
        {restaurantShow && restaurantShow.map((show, id) => (
          <div key={id}>
            <h3>{show.restaurantname}</h3>
            <h4>€{show.type}</h4>
            <h4>€{show.pricelevel}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}

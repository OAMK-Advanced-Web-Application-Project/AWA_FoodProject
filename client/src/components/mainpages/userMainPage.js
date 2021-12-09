import Axios from "axios";
import React, { useState, useEffect } from "react";
import styles from "./searchView.module.css";
import Constants from "../Constants.json";

export default function SearchResult() {
  const [restaurantShow, setRestaurantShow] = useState();
  const [searchTerm, setsearchTerm] = useState("");

  useEffect(() => {
    Axios.get(Constants.API_ADDRESS + "/fetchData/restaurants", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      }
    }).then((result) => {
      const restaurantArray = result.data;
      const restaurantShow = restaurantArray.map((elem) => ({
        id: elem.idrestaurant,
        restaurantname: elem.restaurantname,
        type: elem.type,
        pricelevel: elem.pricelevel,
      }));
      setRestaurantShow(restaurantShow);
    })
  },[])
  

  return (
    <div>
      <input
          class="SearchBox"
          className={styles.SearchBox}
          type="text"
          onChange={(event) => {
            setsearchTerm(event.target.value);
          }}
          placeholder="Search for restaurants..."
        />
      {restaurantShow.filter((show) => {
        if(searchTerm == "") {
          return show
        } else if (show.restaurantname.toLowerCase().includes(searchTerm.toLowerCase())) {
          return show
        }
        }).map((show, id) => (
          <div className={styles.restaurant} key={id}>
            <div className={styles.name}>{show.restaurantname}</div>
            <div className={styles.type}>{show.type}</div>
            <div className={styles.pricelevel}>{show.pricelevel}</div>
          </div>
        ))}
      </div>
  );
}

import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./userMainPage.module.css";
import Constants from "../Constants.json";

export default function SearchResult() {
  const [restaurantShow, setRestaurantShow] = useState();
  const [searchTerm, setsearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get(Constants.API_ADDRESS + "/fetchData/restaurants", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then((result) => {
      const restaurantArray = result.data;
      const restaurantShow = restaurantArray.map((elem) => ({
        idrestaurant: elem.idrestaurant,
        restaurantname: elem.restaurantname,
        type: elem.type,
        pricelevel: elem.pricelevel,
      }));
      setRestaurantShow(restaurantShow);
    });
  }, []);

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
      <div>
        {restaurantShow && restaurantShow.filter((show) => {
          if (searchTerm == "") {
            return show
          }
          else if (show.restaurantname.toLowerCase().includes(searchTerm.toLowerCase())) {
            return show
          }
        })
        .map((show, idrestaurant) => {
        <div>
          {restaurantShow &&
            restaurantShow.map((show, idrestaurant) => {
              return (
                <div
                  className={styles.restaurant}
                  key={idrestaurant}
                  onClick={() => {
                    navigate(`/restaurantmenu/${show.idrestaurant}`);
                  }}>
                    <div className={styles.name}>{show.restaurantname}</div>
                    <div className={styles.type}>{show.type}</div>
                    <div className={styles.price}>{show.pricelevel}</div>
                </div>
              );
            })}
        </div>
        })}
      </div>
    </div>
  );
}

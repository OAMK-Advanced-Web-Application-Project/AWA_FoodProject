import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./searchView.module.css";
import Constants from "../Constants.json";

export default function SearchResult() {
  const [restaurantShow, setRestaurantShow] = useState();
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
      {" "}
      <div>
        {restaurantShow &&
          restaurantShow.map((show, idrestaurant) => {
            return (
              <div
                className={styles.restaurant}
                key={idrestaurant}
                onClick={() => {
                  navigate(`/restaurantmenu/${show.idrestaurant}`);
                }}
              >
                <h3>{show.restaurantname}</h3>
                <h4>€{show.type}</h4>
                <h4>€{show.pricelevel}</h4>
              </div>
            );
          })}
      </div>
    </div>
  );
}

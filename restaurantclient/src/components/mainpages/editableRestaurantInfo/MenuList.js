import styles from "./restaurantInfo.module.css";
import React, { useState, useEffect } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import Axios from "axios";
import Constants from "../../Constants.json";

export default function MenuList() {

  let { id } = useParams();
  const [listOfMenus, setListOfMenus] = useState([]);

  useEffect(() => {
    Axios.get(Constants.API_ADDRESS + `/getMenuItems/${id}`).then(
      (response) => {
        console.log(response);
        setListOfMenus(response.data);
      }
    );
  }, []);

  return (
    <div className={styles.menuListView}>
      <div>{console.log(listOfMenus)}</div>
      <div>
        {listOfMenus &&
          listOfMenus.map((menu, key) => {
            return <div key={key}>{menu.productname}</div>;
          })}
      </div>
    </div>
  );
}

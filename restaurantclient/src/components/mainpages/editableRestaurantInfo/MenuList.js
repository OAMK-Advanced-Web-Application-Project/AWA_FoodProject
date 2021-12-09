import styles from "./restaurantInfo.module.css";
import React, { useState, useParams, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { Axios } from "axios";
import Constants from "../../Constants.json";

export default function MenuList(props) {
/*   let { id } = useParams();
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    Axios.get(Constants.API_ADDRESS + `/getMenuItems/${id}`).then(
      (response) => {
        setMenuItems(response.data);
      }
    );
  }); */

  return (
    <div class={styles.menuListView}>
      <div></div>
      <div class={styles.menuList}>
        {props.menu.map((menu) => (
          <Link to={menu.id}>
            <div class={styles.menuListElement}>{menu.plateName}</div>
          </Link>
        ))}
      </div>
      <div class={styles.menuDetail}>
        <Outlet />
      </div>
    </div>
  );
}

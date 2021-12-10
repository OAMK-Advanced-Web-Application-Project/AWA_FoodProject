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
        const menuItems = response.data;
        setMenuItems(menuItems);
        console.log(response);
      }
    );
  }); */

  return (
    <div class={styles.menuListView}>
      <div>
        {menuItems.map((menu,key) => {
          return <div key={key}>{menu.body}</div>
        })}
      </div>
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

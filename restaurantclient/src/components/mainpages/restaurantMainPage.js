import React, { useState } from "react";
import styles from "./restaurantMainPage.module.css";
import "./editableRestaurantInfo/MenuList.js";
import "./editableRestaurantInfo/MenuDetailView.js";
import "./editableRestaurantInfo/MenuList.js";
import MenuList from "./editableRestaurantInfo/MenuList.js";
import MenuDetailView from "./editableRestaurantInfo/MenuDetailView.js";
import menuData from "./editableRestaurantInfo/menuData.json";
import { v4 as uuidv4 } from "uuid";
import AddMenuItem from "./editableRestaurantInfo/AddMenuItem.js";
import jwt from "jsonwebtoken";

export default function RestaurantMainPage(props) {
  const menus = menuData.map((menu) => {
    return { ...menu, id: uuidv4() };
  });

  const decodedToken = jwt.decode(props.jwt);
  const [userJWT] = useState(props.jwt);

  return (
    <div>
      <div className={styles.restaurantInfoContainer}>
        <div className={styles.editableInfo}>
          <table>
            <tr>Restaurant name: {decodedToken.user.restaurantname}</tr>
            <tr>Username: {decodedToken.user.username}</tr>
            <tr>Address: {decodedToken.user.address}</tr>
            <tr>Operating hours: {decodedToken.user.operatinghours}</tr>
            <tr>Type: {decodedToken.user.type}</tr>
            <tr>Price level: {decodedToken.user.pricelevel}</tr>
          </table>
        </div>
        <img
          className={styles.restaurantImage}
          src="/images/maccas.jpg"
          alt="Logo"
        />
      </div>
      <div className={styles.editableMenu}>
        <MenuList menu={menus} />
        <MenuDetailView menus={menus} />
      </div>
      <div className={styles.editableMenu}>
      <AddMenuItem jwt={userJWT} />
      </div>
    </div>
  );
}

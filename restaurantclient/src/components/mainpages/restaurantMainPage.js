import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./restaurantMainPage.module.css";
import "./editableRestaurantInfo/MenuList.js";
import MenuList from "./editableRestaurantInfo/MenuList.js";
import menuData from "./editableRestaurantInfo/menuData.json";
import { v4 as uuidv4 } from "uuid";
import AddMenuItem from "./editableRestaurantInfo/AddMenuItem.js";
import jwt from "jsonwebtoken";
import Axios from "axios";
import { Image } from "cloudinary-react";
import Constants from "../Constants.json";
import OrdersList from "./editableRestaurantInfo/OrdersList";

export default function RestaurantMainPage(props) {
  const menus = menuData.map((menu) => {
    return { ...menu, id: uuidv4() };
  });

  const decodedToken = jwt.decode(props.jwt);
  const [userJWT] = useState(props.jwt);
  localStorage.setItem("restaurantID", decodedToken.user.id);

  return (
    <div className={styles.mainWrapper}>
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
        <Image cloudName="dwbi2ichj" publicId={decodedToken.user.image}></Image>
      </div>
      
      <div className={styles.editableMenu}>
        <MenuList menu={menus} />
      </div>
      <div className={styles.editableMenu}>
        <AddMenuItem jwt={userJWT} />
      </div>
      <div>
        <OrdersList />
      </div>

    </div>
  );
}

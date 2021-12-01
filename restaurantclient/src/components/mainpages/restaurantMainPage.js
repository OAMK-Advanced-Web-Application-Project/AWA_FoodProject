import React from "react";
import styles from "./restaurantMainPage.module.css";
import "./editableRestaurantInfo/MenuList.js";
import "./editableRestaurantInfo/MenuDetailView.js";
import "./editableRestaurantInfo/MenuList.js";
import MenuList from "./editableRestaurantInfo/MenuList.js";
import MenuDetailView from "./editableRestaurantInfo/MenuDetailView.js";
import menuData from "./editableRestaurantInfo/menuData.json";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import Axios from "axios";
import Constants from "../Constants.json";
import AddMenuItem from "./editableRestaurantInfo/AddMenuItem.js";
import jwt from "jsonwebtoken";

export default function RestaurantMainPage(props) {
  const menus = menuData.map((menu) => {
    return { ...menu, id: uuidv4() };
  });

  const decodedToken = jwt.decode(props.jwt);
  console.log(decodedToken);

  return (
    <div>
      <div className={styles.restaurantInfoContainer}>
        <div className={styles.editableInfo}>
          <table>
            <tr>Restaurant name</tr>
{/*             { decodedToken.restaurantname} */}
            <tr>
              <input></input>
            </tr>
            <tr>Username</tr>{" "}
            <tr>
              <input></input>
            </tr>
            <tr>Password</tr>{" "}
            <tr>
              <input></input>
            </tr>
            <tr>Address</tr>{" "}
            <tr>
              <input></input>
            </tr>
            <tr>Operating hours</tr>{" "}
            <tr>
              <input></input>
            </tr>
            <tr>Type</tr>{" "}
            <tr>
              <input></input>
            </tr>
            <tr>Price level</tr>{" "}
            <tr>
              <input></input>
            </tr>
          </table>
          <button>Apply changes</button>
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
        <AddMenuItem />
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
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

  const [imageSelected, setImageSelected] = useState("");
  const [showImage, setShowImage] = useState("");

  const uploadImage = () => {
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "ujyz5zuo");

    Axios.post(
      "https://api.cloudinary.com/v1_1/dwbi2ichj/image/upload",
      formData
    ).then((response) => {
      setShowImage(response.data.url);
    }, []);
  };

  Axios.put(Constants.API_ADDRESS + "/restaurantImage", {
    image: showImage,
    idrestaurant: decodedToken.user.id,
  }).then((response) => {
    console.log("Image uploaded");
  }, []);

  let imageURL = ""
  Axios.get(Constants.API_ADDRESS + "/getImage").then((response) => {
    const imageURL = response
    console.log(imageURL);
    return imageURL;
  });

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
        <div>
          <input
            type="file"
            onChange={(event) => {
              setImageSelected(event.target.files[0]);
            }}
          />
          <button onClick={uploadImage}>Upload Image</button>
          <Image cloudName="dwbi2ichj" publicId={imageURL}></Image>
        </div>
      </div>
      
      <div className={styles.editableMenu}>
        <MenuList menu={menus} />
      </div>
      <div className={styles.editableMenu}>
        <AddMenuItem jwt={userJWT} />
      </div>
      <div>
      <OrdersList/>
      </div>

    </div>
  );
}

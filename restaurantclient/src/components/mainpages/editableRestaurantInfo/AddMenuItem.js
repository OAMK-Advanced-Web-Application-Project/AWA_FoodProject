import React, { Component } from "react";
import { useState } from "react";
import Axios from "axios";
import Constants from "../../Constants.json";
import styles from "./AddMenuItem.module.css";
import jwt from "jsonwebtoken";
import { Image } from "cloudinary-react";

export default function AddMenuItem(props) {
  const [productnameReg, setProductnameReg] = useState("");
  const [descriptionReg, setDescriptionReg] = useState("");
  const [priceReg, setPriceReg] = useState("");

  const decodedToken = jwt.decode(props.jwt);

  const [imageSelectedMenu, setImageSelectedMenu] = useState("");
  const [showImageMenu, setShowImageMenu] = useState("");

  const uploadImage = () => {
    const formData = new FormData();
    formData.append("file", imageSelectedMenu);
    formData.append("upload_preset", "ujyz5zuo");

    Axios.post(
      "https://api.cloudinary.com/v1_1/dwbi2ichj/image/upload",
      formData
    ).then((response) => {
      console.log(response.data.url);
      setShowImageMenu(response.data.url);
    }, []);
  };

  const addProduct = () => {
    Axios.post(
      Constants.API_ADDRESS + "/createMenuItem",
      {
        idrestaurant: decodedToken.user.id,
        productname: productnameReg,
        description: descriptionReg,
        price: priceReg,
        image: showImageMenu,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    ).then((response) => {
      console.log(showImageMenu);
      console.log(response);
      console.log("Menu item added successfully.");
    });
  };

  return (
    <div className={styles.addMenuItem}>
      <div className={styles.title}>Add menu item</div>
      <label>Product name</label>
      <input
        type="text"
        onChange={(event) => {
          setProductnameReg(event.target.value);
        }}
      />
      <label>Description</label>
      <input
        type="text"
        onChange={(event) => {
          setDescriptionReg(event.target.value);
        }}
      />
      <label>Price €</label>
      <input
        type="text"
        onChange={(event) => {
          setPriceReg(event.target.value);
        }}
      />
      <input
        type="file"
        onChange={(event) => {
          setImageSelectedMenu(event.target.files[0]);
        }}
      />
      <button onClick={uploadImage}> Upload Image</button>
      <div className={styles.productButton}>
        <button  onClick={addProduct}> Add product </button>
      </div>
    </div>
  );
}

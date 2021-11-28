import React, { Component } from 'react'
import { useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import Constants from '../../Constants.json';
import styles from "./AddMenuItem.module.css"

export default function AddMenuItem() {
    const [productnameReg, setProductnameReg] = useState("");
    const [descriptionReg, setDescriptionReg] = useState("");
    const [priceReg, setPriceReg] = useState("");

    const addProduct = () => {
        Axios.post(Constants.API_ADDRESS + "/createMenuItem", {
          productname: productnameReg,
          description: descriptionReg,
          price: priceReg,

        }).then((response) => {
          console.log(response);
        });
      };

      return (
        <div className={styles.addMenuItem} >
            <h1>Add menu item</h1>
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
            <label>Price</label>
            <input
              type="text"
              onChange={(event) => {
                setPriceReg(event.target.value);
              }}
            />
            <div>
              <button onClick={addProduct}> Add product </button>
            </div>
        </div>
      );
}

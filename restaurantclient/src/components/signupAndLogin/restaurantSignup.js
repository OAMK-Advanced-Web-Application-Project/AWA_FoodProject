import { useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import styles from "./signup.module.css";
import Constants from "../Constants.json";

export default function RestaurantSignup() {
  const [restaurantnameReg, setRestaurantnameReg] = useState("");
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [addressReg, setAddressReg] = useState("");
  const [operatinghoursReg, setOperatinghoursReg] = useState("");
  const [typeReg, setTypeReg] = useState("");
  const [pricelevelReg, setPriceLevel] = useState("");

  const addRestaurant = () => {
    Axios.post(Constants.API_ADDRESS + "/createRestaurant", {
      restaurantname: restaurantnameReg,
      username: usernameReg,
      password: passwordReg,
      address: addressReg,
      operatinghours: operatinghoursReg,
      type: typeReg,
      pricelevel: pricelevelReg,
    }).then((response) => {
      console.log("done");
    });
  };

  return (
    <div class={styles.background}>
      <div class={styles.signupForm}>
        <h1>Signup</h1>
        <label>Restaurant name</label>
        <input
          type="text"
          onChange={(event) => {
            setRestaurantnameReg(event.target.value);
          }}
        />
        <label>Username</label>
        <input
          type="text"
          onChange={(event) => {
            setUsernameReg(event.target.value);
          }}
        />
        <label>Password</label>
        <input
          type="text"
          onChange={(event) => {
            setPasswordReg(event.target.value);
          }}
        />
        <label>Address</label>
        <input
          type="text"
          onChange={(event) => {
            setAddressReg(event.target.value);
          }}
        />
        <label>operatinghours</label>
        <input
          type="text"
          onChange={(event) => {
            setOperatinghoursReg(event.target.value);
          }}
        />
        <label>type</label>
        <input
          type="text"
          onChange={(event) => {
            setTypeReg(event.target.value);
          }}
        />
        <label>pricelevel</label>
        <input
          type="text"
          onChange={(event) => {
            setPriceLevel(event.target.value);
          }}
        />
        <Link to="/restaurantlogin">
          <button onClick={addRestaurant}> Register </button>
        </Link>
      </div>
    </div>
  );
}

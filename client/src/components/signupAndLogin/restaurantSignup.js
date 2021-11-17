import { useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import styles from './signup.module.css';

export default function RestaurantSignup() {
  const [restaurantnameReg, setRestaurantnameReg] = useState("");
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [addressReg, setAddressReg] = useState("");

  const addRestaurant = () => {
    Axios.post("http://localhost:3001/createRestaurant", {
      restaurantName: restaurantnameReg,
      username: usernameReg,
      password: passwordReg,
      address: addressReg,
    }).then((response) => {
      console.log("done");
    });
  };

  return (
    <div class={ styles.signupForm }>
      <h1>Signup</h1>
      <label>RestaurantName</label>
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
      <Link to="/restaurantlogin">
        <button onClick={addRestaurant}> Register </button>
      </Link>
    </div>
  );
}

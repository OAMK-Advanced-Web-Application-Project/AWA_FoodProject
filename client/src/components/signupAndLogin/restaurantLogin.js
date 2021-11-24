import { useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import styles from "./login.module.css";

export default function RestaurantLogin() {
  const [usernameLog, setUsernameLog] = useState("");
  const [passwordLog, setPasswordLog] = useState("");

  const [loginStatus, setLoginStatus] = useState("");

  const restaurantLogin = () => {
    Axios.post("http://localhost:3001/loginRestaurant", {
      username: usernameLog,
      password: passwordLog,
    }).then((response) => {
      console.log(response);
    });
  };

  return (
    <div class={styles.background}>
      <div class={styles.loginForm}>
        <h1>login</h1>
        <label>Username</label>
        <input
          type="text"
          onChange={(event) => {
            setUsernameLog(event.target.value);
          }}
        />
        <label>Password</label>
        <input
          type="text"
          onChange={(event) => {
            setPasswordLog(event.target.value);
          }}
        />
        <Link to="../mainpages/restaurantMainPage">
          <button onClick={restaurantLogin}> Login </button>
        </Link>
        <h2>If you have not registered yet please</h2>
        <Link to="/restaurantSignup">
          <button> Sign up </button>
        </Link>
        <h1>{loginStatus}</h1>
      </div>
    </div>
  );
}

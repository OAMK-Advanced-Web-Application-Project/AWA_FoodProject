import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import styles from "./login.module.css";
import Constants from "../Constants.json";
import jwt from "jsonwebtoken";

export default function RestaurantLogin(props) {

  const [usernameLog, setUsernameLog] = useState("");
  const [passwordLog, setPasswordLog] = useState("");

  const navigate = useNavigate();

  const restaurantLogin = async (event) => {
    event.preventDefault();
    const result = await Axios.post(
      Constants.API_ADDRESS + "/RestaurantLogin",
      null,
      {
        auth: {
          username: usernameLog,
          password: passwordLog,
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    localStorage.setItem("token", result.data.token);
    const receivedJWT = result.data.token;
    props.login(receivedJWT);
    navigate("/restaurantmainpage", { replace: true });
  };

  return (
    <div class={styles.background}>
      <form onSubmit={restaurantLogin}>
        <div class={styles.loginForm}>
          <div className={styles.Login}>Login</div>
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
          <button type="submit"> Login </button>
          <div className={styles.SignupText}>If you have not registered yet, please sign up below</div>
          <Link to="/restaurantSignup/" className={styles.Signup}>
            <button> Sign up </button>
          </Link>
        </div>
      </form>
    </div>
  );
}

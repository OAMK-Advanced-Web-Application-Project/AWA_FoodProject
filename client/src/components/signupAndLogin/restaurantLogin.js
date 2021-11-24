import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import styles from "./login.module.css";
import Constants from "../Constants.json";

export default function RestaurantLogin() {
  Axios.defaults.withCredentials = true;

  const [usernameLog, setUsernameLog] = useState("");
  const [passwordLog, setPasswordLog] = useState("");

  const [loginStatus, setLoginStatus] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    Axios.get(Constants.API_ADDRESS + "/RestaurantLogin").then((response) => {
      if (response.data.loggedIn === true) {
        setLoginStatus(response.data.user[0].username);
      }
    });
  }, []);

  const restaurantLogin = async (event) => {
    event.preventDefault();
    Axios.post(Constants.API_ADDRESS + "/RestaurantLogin", {
      username: usernameLog,
      password: passwordLog,
    }).then((response) => {
      if (!response.data.auth) {
        setLoginStatus(false);
        console.log("login failed");
      } else {
        localStorage.setItem("token", response.data.token);
        setLoginStatus(true);
        navigate("/restaurantmainpage", { replace: true });
      }
    });
  };

  return (
    <div class={styles.background}>
      <form onSubmit={restaurantLogin}>
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
          <button type="submit"> Login </button>
          <h2>If you have not registered yet please</h2>
          <Link to="/restaurantSignup">
            <button> Sign up </button>
          </Link>
        </div>
      </form>
    </div>
  );
}

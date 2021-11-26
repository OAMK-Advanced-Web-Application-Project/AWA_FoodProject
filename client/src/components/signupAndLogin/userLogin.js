import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import styles from "./login.module.css";
import Constants from "../Constants.json";

export default function UserLogin(props) {
  Axios.defaults.withCredentials = true;
  const [usernameLog, setUsernameLog] = useState("");
  const [passwordLog, setPasswordLog] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    Axios.get(Constants.API_ADDRESS + "/UserLogin").then((response) => {
      if (response.data.loggedIn === true) {
        console.log(response.data.user[0].username);
      }
    });
  }, []);

  const userLogin = async (event) => {
    event.preventDefault();
    Axios.post(Constants.API_ADDRESS + "/UserLogin", {
      username: usernameLog,
      password: passwordLog,
    }).then((response) => {
      if (!response.data.auth) {
        console.log("login failed");
      } else {
        localStorage.setItem("token", response.data.token);
        navigate("/restaurantmainpage", { replace: true });
      }
    });
  };

  return (
    <div className={styles.background}>
      <form onSubmit={userLogin}>
        <div className={styles.loginForm}>
          <h1>Login</h1>
          <label>Username</label>
          <input type="text" name="username" />
          <label>Password</label>
          <input type="text" name="password" />
          <button type="submit">Login</button>
          <h2>If you have not registered yet, please sign up</h2>
          <Link to="/userSignup">
            <button> Sign up </button>
          </Link>
        </div>
      </form>
    </div>
  );
}

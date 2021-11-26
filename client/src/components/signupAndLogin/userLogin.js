import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import styles from "./login.module.css";
import Constants from "../Constants.json";

export default function UserLogin(props) {
  Axios.defaults.withCredentials = true;

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

    try {
      const result = await Axios.post(
        Constants.API_ADDRESS + "/UserLogin",
        null,
        {
          auth: {
            username: event.target.username.value,
            password: event.target.password.value,
          }
        }
      );
      console.log(result);
      const receivedJWT = result.data.token;
      props.login(receivedJWT);
      navigate("/userMainPage", { replace: true });
    } catch (error) {
      console.error(error);
    }
  }

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

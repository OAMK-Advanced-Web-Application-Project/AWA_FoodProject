import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import styles from "./login.module.css";
import Constants from "../Constants.json";

export default function UserLogin() {
  
  Axios.defaults.withCredentials = true;

  const [usernameLog, setUsernameLog] = useState("");
  const [passwordLog, setPasswordLog] = useState("");
  const [loginStatus, setLoginStatus] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    Axios.get(Constants.API_ADDRESS + "/UserLogin").then((response) => {
      if (response.data.loggedIn === true) {
        setLoginStatus(response.data.user[0].username);
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
        setLoginStatus(false);
        console.log('login failed');
      } else {
        localStorage.setItem("token", response.data.token);
        setLoginStatus(true);
        navigate('/usermainpage', {replace: true})
      }
    });
  };

  /*   const userAuthenticated = () => {
    Axios.get("http://localhost:3001/isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    }).then((response) => {
      console.log(response);
    });
  }; */

  return (
    <div class={styles.background}>
      <form onSubmit={userLogin}>
        <div class={styles.loginForm}>
          <h1>Login</h1>
          <label>Username</label>
          <input type="text" onChange={(event) => {
              setUsernameLog(event.target.value);
          }} />
          <label>Password</label>
          <input type="text" onChange={(event) => {
            setPasswordLog(event.target.value);
          }} />
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

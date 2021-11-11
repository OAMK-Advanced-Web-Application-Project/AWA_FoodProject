import { useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

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
    <div className="userSignupForm">
      <h1 className="userSignupTitle">login</h1>
      <label>Username</label>
      <input
        type="text"
        placeholder="Username..."
        onChange={(event) => {
          setUsernameLog(event.target.value);
        }}
      />
      <label>Password</label>
      <input
        type="text"
        placeholder="Password..."
        onChange={(event) => {
          setPasswordLog(event.target.value);
        }}
      />
      {/*       must be linked to restaurant mainpage
       */}{" "}
      <Link to="/restaurantMainpage">
        <button onClick={restaurantLogin}> Login </button>
      </Link>
      <h2>If you have not registered yet please</h2>
      <Link to="/restaurantSignup">Sign up</Link>
      <h1>{loginStatus}</h1>
    </div>
  );
}

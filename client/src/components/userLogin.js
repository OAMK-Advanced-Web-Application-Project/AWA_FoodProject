import { useState } from "react";
import Axios from "axios";

export default function UserLogin() {
  const [usernameLog, setUsernameLog] = useState("");
  const [passwordLog, setPasswordLog] = useState("");

  const [loginStatus, setLoginStatus] = useState("");

  const login = () => {
    Axios.post("http://localhost:3001/login", {
      username: usernameLog,
      password: passwordLog,
    }).then((response) => {
      if (response.data.message) {
        //must put a message that username does not exist, please create a acount.
        setLoginStatus(response.data.message);
      } else {
        // must redirect to the mainpage of the user instead of message
        setLoginStatus(response.data[0].username);
      }
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
      <button onClick={login}> Login </button>
      <h2>If you have not registered yet please signup</h2>
      <h1>{loginStatus}</h1>
    </div>
  );
}

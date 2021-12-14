import { useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import styles from "./signup.module.css";
import Constants from "../Constants.json";

export default function UserSignup() {
  const [firstnameReg, setFirstnameReg] = useState("");
  const [lastnameReg, setLastnameReg] = useState("");
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [addressReg, setAddressReg] = useState("");

  const addUser = () => {
    Axios.post(Constants.API_ADDRESS + "/createUser", {
      firstname: firstnameReg,
      lastname: lastnameReg,
      username: usernameReg,
      password: passwordReg,
      address: addressReg,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      console.log(response);
    });
  };

  return (
    <div class ={styles.background}>
      <div class={styles.signupForm}>
        <h1>Signup</h1>
        <label>Firstname</label>
        <input
          type="text"
          onChange={(event) => {
            setFirstnameReg(event.target.value);
          }}
        />
        <label>Lastname</label>
        <input
          type="text"
          onChange={(event) => {
            setLastnameReg(event.target.value);
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
        <Link to="/userlogin">
          <button onClick={addUser}> Register </button>
        </Link>
      </div>
    </div>
  );
}

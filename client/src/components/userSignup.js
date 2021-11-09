import React, { useState } from "react";
import Axios from "axios";
import "./signup.css";

export default function UserSignup() {
  const [firstnameReg, setFirstnameReg] = useState("");
  const [lastnameReg, setLastnameReg] = useState("");
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [addressReg, setAddressReg] = useState("");

  const register = () => {
    Axios.post("http://localhost3001/register", {
      firstname: firstnameReg,
      lastname: lastnameReg,
      username: usernameReg,
      password: passwordReg,
      address: addressReg,
    }).then((response) => {
      console.log(response);
    });
  };

  return (
    <div className="userSignupForm">
      <h1 className="userSignupTitle">Signup</h1>
      <label>Firstname</label>
      <input
        type="text"
        onChange={(e) => {
          setFirstnameReg(e.target.value);
        }}
      />
      <label>Lastname</label>
      <input
        type="text"
        onChange={(e) => {
          setLastnameReg(e.target.value);
        }}
      />
      <label>Username</label>
      <input
        type="text"
        onChange={(e) => {
          setUsernameReg(e.target.value);
        }}
      />
      <label>Password</label>
      <input
        type="text"
        onChange={(e) => {
          setPasswordReg(e.target.value);
        }}
      />
      <label>Address</label>
      <input
        type="text"
        onChange={(e) => {
          setAddressReg(e.target.value);
        }}
      />
      <button onClick={register}> Register </button>
    </div>
  );
}

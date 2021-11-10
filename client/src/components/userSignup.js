import { useState } from "react";
import Axios from "axios";
import "./signup.css";

export default function UserSignup() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");

  const addUser = () => {
    Axios.post("http://localhost:3001/create", {
      firstname: firstname,
      lastname: lastname,
      username: username,
      password: password,
      address: address,
    }).then(() => {
      console.log("success");
    });
  };

  return (
    <div className="userSignupForm">
      <h1 className="userSignupTitle">Signup</h1>
      <label>Firstname</label>
      <input
        type="text"
        onChange={(event) => {
          setFirstname(event.target.value);
        }}
      />
      <label>Lastname</label>
      <input
        type="text"
        onChange={(event) => {
          setLastname(event.target.value);
        }}
      />
      <label>Username</label>
      <input
        type="text"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <label>Password</label>
      <input
        type="text"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <label>Address</label>
      <input
        type="text"
        onChange={(event) => {
          setAddress(event.target.value);
        }}
      />
      <button onClick={addUser}> Register </button>
    </div>
  );
}

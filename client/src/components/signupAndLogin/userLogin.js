import { useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

export default function UserLogin() {
  const [usernameLog, setUsernameLog] = useState("");
  const [passwordLog, setPasswordLog] = useState("");

  const [loginStatus, setLoginStatus] = useState("");

  Axios.default.withCredentials = true;

  const userLogin = () => {
    Axios.post("http://localhost:3001/loginUser", {
      username: usernameLog,
      password: passwordLog,
    }).then((response) => {
      console.log(response);
    });
  };

/*   useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.loggedIn == true) {
        setLoginStatus(response.data.user[0].username);
      }
    });
  }, [input]); */

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
      <Link to="../mainpages/userMainpage">
        <button onClick={userLogin}> Login </button>
      </Link>
      <h2>If you have not registered yet please</h2>
      <Link to="/userSignup">Sign up</Link>
      <h1>{loginStatus}</h1>
    </div>
  );
}

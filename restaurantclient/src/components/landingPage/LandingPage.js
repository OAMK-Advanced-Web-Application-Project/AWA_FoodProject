import React, {useState} from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";
import jwt from "jsonwebtoken";

export default function LandingPage(props) {

  const jwtStorage = localStorage.getItem("token");
  const decodedToken = jwt.decode(jwtStorage);

  return (
    <div className={styles.background}>
      <div className={styles.landingContainer}>
        <div className={styles.containerContent}>
          <div>
            You are {props.userLoggedIn ? " logged in" : " not logged in"}
          </div>
          <div className={styles.loginButtons}>
            {props.userLoggedIn ? (
              <Link to={`/restaurantMainpage/${decodedToken.user.id}`}> Go to main </Link>
            ) : (
              <Link to="/restaurantlogin"> Log in </Link>
            )}{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";

export default function LandingPage(props) {
  return (
    <div class={styles.background}>
      <div class={styles.landingContainer}>
        <div class={styles.containerContent}>
          <div>
            You are {props.userLoggedIn ? " logged in" : " not logged in"}
          </div>
          <div class={styles.loginButtons}>
            {props.userLoggedIn ? (
              <Link to="/restaurantMainpage"> Go to mainpage </Link>
            ) : (
              <Link to="/restaurantlogin"> Log in </Link>
            )}{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

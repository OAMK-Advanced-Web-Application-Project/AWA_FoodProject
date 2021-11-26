import React from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";

export default function LandingPage(props) {
  return (
    <div class={styles.background}>
      <div class={styles.landingContainer}>
        <div class={styles.containerContent}>
          <div>
            User login status:{" "}
            {props.userLoggedIn ? "is logged in" : "is not logged in"}
          </div>
          <div class={styles.loginButtons}>
            {props.userLoggedIn ? (
              <Link to="/userMainpage"> Go to mainpage </Link>
            ) : (
              <Link to="/userlogin"> Log in </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

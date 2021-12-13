import React from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";

export default function LandingPage(props) {
  return (
    <div className={styles.background}>
      <div className={styles.landingContainer}>
        <div className={styles.containerContent}>
          <div className={styles.containerText}>
            You are  {" "}
            {props.userLoggedIn ? " logged in" : " not logged in"}
          </div>
          <div className={styles.LoginText}>
            {props.userLoggedIn ? (
              <Link to="/userMainpage"> Go to main </Link>
            ) : (
              <Link to="/userlogin"> Log in </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

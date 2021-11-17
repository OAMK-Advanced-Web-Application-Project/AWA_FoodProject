import React from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";

class LandingPage extends React.Component {
  render() {
    return (
      <div class={styles.background}>
        <div class={styles.bothLandings}>
          <div class={styles.landingContainer}>
            <div class={styles.containerContent}>
              <p>Expand your business and offer your delicious meals</p>
              <div class={styles.loginButtons}>
                <Link to="/restaurantlogin">
                  Log in as a bistro
                </Link>
              </div>
            </div>
          </div>
          <div class={styles.landingContainer}>
            <div class={styles.containerContent}>
              <p>Hungry?</p>
              <p>Your order is coming!</p>
              <div class={styles.loginButtons}>
                <Link to="/userlogin">
                  Log in as a customer
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;

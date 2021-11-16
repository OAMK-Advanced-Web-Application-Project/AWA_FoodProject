import React from 'react';
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

class NavbarNoSearch extends React.Component {
  render() {
    return (
      <div className= { styles.NavbarBase }>
        <div className= { styles.NavbarContent} >
          <img className= { styles.MainLogo } src="images/jolt_logo.png" alt="Logo" />
          <div className= { styles.Wrapper }>
            <Link to="/cart">
              <img className= { styles.Cart} src={`./images/cart.png`} alt={"cart"}/>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default NavbarNoSearch


  
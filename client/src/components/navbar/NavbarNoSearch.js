import React, {useState} from 'react';
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";



class NavbarNoSearch extends React.Component {
  render() {
    return (
      <div className= { styles.NavbarBase }>
        <div className= { styles.NavbarContent} >
          <img className= { styles.MainLogo } src="images/jolt_logo.png" alt="Logo" />
          <div className= { styles.Wrapper }>
            <Link to="/cart"> <img className= { styles.Cart} src={`./images/cart.png`} alt={"cart"}/> </Link>
            <div className= { styles.NavbarButton } > <Link to="/orderhistory"> Order History </Link> </div>
            <div className= { styles.NavbarButton } > <Link to="/"> Log Out </Link> </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NavbarNoSearch


  
import React from 'react';
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

export default function Navbar(props) {

  return (
  <div className= { styles.NavbarBase }>
    <div className= { styles.NavbarContent} >
      <Link to="/"> <img className= { styles.MainLogo } src="images/jolt_logo.png" alt="Logo" /> </Link>
      <div className= { styles.Wrapper }>
      {props.userLoggedIn ? ( <>
          <Link to="/cart"> <img className= { styles.Cart} src={`./images/cart.png`} alt={"cart"}/> </Link>
          <div className={styles.OrderHistory}>
            <Link to="/orderhistory">  Order History </Link>
          </div>
          <div className={styles.LogOut}>
            <Link to="/"  onClick={props.logout}> Log Out </Link>   
          </div>
        </> )
          :
          ( <div className={ styles.NavbarText}>
            Welcome to jolt! Enjoy ordering food from the comfort of your homes!
          </div> )}
      </div>
    </div>
  </div>
  )
}



  
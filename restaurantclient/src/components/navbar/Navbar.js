import React from 'react';
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

export default function Navbar(props) {

 
  return (
    <div className= { styles.NavbarBase }>
    <div className= { styles.NavbarContent} >
      <img className= { styles.MainLogo } src="images/jolt_logo.png" alt="Logo" />
      <div className= { styles.Wrapper }>
      {props.userLoggedIn ? ( <>
          <div className={styles.OrderHistory}>
            <Link to="/orderhistory">  Order History </Link>
          </div>
          <div className={styles.LogOut}>
            <Link to="/"  onClick={props.logout}> Log Out </Link>   
          </div>        
        </> )
          :
          ( <div className={ styles.NavbarText}>
            Welcome to Jolt - Market your restaurant the modern way!
          </div> )}
      </div>
    </div>
  </div>
  )
}



  
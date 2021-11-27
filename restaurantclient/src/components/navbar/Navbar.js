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
          <Link to="/orderhistory"> Order History </Link>
          <Link to="/" onClick={props.logout}> Log Out </Link>         
        </> )
          :
          ( <>
            Welcome to jolt! Enjoy ordering food from the comfort of your homes!
          </> )}
      </div>
    </div>
  </div>
  )
}



  
import React from 'react';
import styles from "./Navbar.module.css";

class NavbarWithSearch extends React.Component {
  render() {
    return (
      <div className= { styles.NavbarBase }>
        <div className= { styles.NavbarContent} >
          <img className= { styles.MainLogo } src="images/jolt_logo.png" alt="Logo" />
          <input className= { styles.SearchBox } type="text" placeholder="Search"/>
        </div>
      </div>
    );
  }
}

export default NavbarWithSearch


  
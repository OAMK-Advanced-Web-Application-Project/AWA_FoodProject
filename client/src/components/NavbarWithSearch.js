import React from 'react';
import "./Navbar.css";

class NavbarWithSearch extends React.Component {
  render() {
    return (
      <div className="NavbarBase">
        <div className="NavbarContent">
          <img className="MainLogo" src="images/jolt_logo.png" alt="Logo" />
          <input className="SearchBox" type="text" placeholder="Search"/>
        </div>
      </div>
    );
  }
}

export default NavbarWithSearch


  
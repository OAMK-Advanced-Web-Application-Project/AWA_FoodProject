import React from 'react';
import "./Navbar.css";

class NavbarNoSearch extends React.Component {
  render() {
    return (
      <div className="NavbarBase">
        <div className="NavbarContent">
          <img className="MainLogo" src="images/jolt_logo.png" alt="Logo" />
        </div>
      </div>
    );
  }
}

export default NavbarNoSearch


  
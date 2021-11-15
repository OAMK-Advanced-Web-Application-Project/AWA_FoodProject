import React from 'react';
import { Link } from "react-router-dom";
import "./Navbar.css";

class NavbarNoSearch extends React.Component {
  render() {
    return (
      <div className="NavbarBase">
        <div className="NavbarContent">
          <img className="MainLogo" src="images/jolt_logo.png" alt="Logo" />
          <Link to="/cart">Cart</Link>
        </div>
      </div>
    );
  }
}

export default NavbarNoSearch


  
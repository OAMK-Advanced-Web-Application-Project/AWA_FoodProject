import React from 'react';
import "./Navbar.css";

class Navbar extends React.Component {
  render() {
    return (
      <div class="NavbarBase">
        <div class="NavbarContent">
          <img class="MainLogo" src="images/jolt_logo.png" alt="Logo" />
          <input class="SearchBox" type="text" placeholder="Search"/>
        </div>
      </div>
    );
  }
}

export default Navbar


  
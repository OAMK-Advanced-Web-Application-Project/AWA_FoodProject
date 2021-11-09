import React from "react";
import "./LandingPage.css";

class LandingPage extends React.Component {
    render() {
      return (
        <div class="landingContainer">
            <div class="containerContent">
                    <p>Exquisite flavors.</p>
                    <p>Simply delivered.</p>
            <div class="loginButtons">
                <button class="buttonRestaurant">Log in as a bistro</button>
                <button class="buttonCustomer">Log in as a customer</button>
            </div>

            </div>
        </div>
      );
    }
  }
  
  export default LandingPage
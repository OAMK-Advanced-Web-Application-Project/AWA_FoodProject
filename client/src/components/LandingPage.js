import React from "react";
import "./LandingPage.css";

class LandingPage extends React.Component {
    render() {
      return (
        <div className="landingContainer">
            <div className="containerContent">
                    <p>Exquisite flavors.</p>
                    <p>Simply delivered.</p>
            <div className="loginButtons">
                <button className="buttonRestaurant">Log in as a bistro</button>
                <button className="buttonCustomer">Log in as a customer</button>
            </div>

            </div>
        </div>
      );
    }
  }
  
  export default LandingPage
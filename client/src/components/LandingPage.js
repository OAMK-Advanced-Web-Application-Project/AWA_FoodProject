import React from "react";
import "./LandingPage.css";
import { Link } from "react-router-dom";


class LandingPage extends React.Component {
    render() {
      return (
        <div className="landingContainer">
            <div className="containerContent">
                    <p>Exquisite flavors.</p>
                    <p>Simply delivered.</p>
            <div className="loginButtons">
                <Link to="/restaurantlogin" className="buttonRestaurant">Log in as a bistro</Link>
                <Link to ="/userlogin" className="buttonCustomer">Log in as a customer</Link>
            </div>

            </div>
        </div>
      );
    }
  }
  
  export default LandingPage
import React from "react";
import "./restaurantMainPage.css";



class RestaurantMainPage extends React.Component {
    render() {
    return (

        <div>
            <div className="restaurantInfoContainer">
                <div className="editableInfo">
                    <table>
                        <tr>Restaurant name</tr> <tr><input></input></tr>
                        <tr>Username</tr> <tr><input></input></tr>
                        <tr>Password</tr> <tr><input></input></tr>
                        <tr>Address</tr> <tr><input></input></tr>
                        <tr>Operating hours</tr> <tr><input></input></tr>
                        <tr>Type</tr> <tr><input></input></tr>
                        <tr>Price level</tr> <tr><input></input></tr>
                    </table>
                    <button>Apply changes</button>
                </div>
                <img className="restaurantImage" src="/images/maccas.jpg" alt="Logo" />
            </div>
            </div>
            
    );
    }
}


export default RestaurantMainPage;


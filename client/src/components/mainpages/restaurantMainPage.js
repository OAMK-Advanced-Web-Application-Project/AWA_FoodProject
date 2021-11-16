import React from "react";
import "./restaurantMainPage.css";



class RestaurantMainPage extends React.Component {
    render() {
    return (

        <div>
            <div className="restaurantInfoContainer">
                <div className="editableInfo">
                    <table>
                        <tr>Restaurant name <input></input></tr>
                        <tr>Username <input></input></tr>
                        <tr>Password <input></input></tr>
                        <tr>Address <input></input></tr>
                        <tr>Operating hours <input></input></tr>
                        <tr>Type <input></input></tr>
                        <tr>Price level <input></input></tr>
                    </table>
                    <button>Apply changes</button>
                </div>
                <img className="restaurantImage" src="images/maccas.jpg" alt="Logo" />
            </div>
            </div>
            
    );
    }
}


export default RestaurantMainPage;


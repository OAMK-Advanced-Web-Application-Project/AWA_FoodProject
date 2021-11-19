import React from "react";
import "./restaurantMainPage.css";
import "./editableRestaurantInfo/MenuList.js";
import "./editableRestaurantInfo/MenuDetailView.js";
import "./editableRestaurantInfo/MenuList.js";
import MenuList from "./editableRestaurantInfo/MenuList.js";
import MenuDetailView from "./editableRestaurantInfo/MenuDetailView.js";
import menuData from "./editableRestaurantInfo/menuData.json";
import { v4 as uuidv4 } from 'uuid';




class RestaurantMainPage extends React.Component {
    
    render() {
        const menus = menuData.map(menu => {
            return { ...menu, id: uuidv4() }
          })
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

            <div className="editableMenu">
                <MenuList menu={ menus }/>
                <MenuDetailView menus={ menus } />
            </div>
        </div>
    ); 
    }
}




export default RestaurantMainPage;


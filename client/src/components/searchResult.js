import React from 'react'
import './mainPage.css'
import { Link } from "react-router-dom";
import RestaurantPage from './restaurantPage';


export default function searchResult(props) {
    return (
        <div className="restaurant">
            <div><img src={`./images/${props.image}`}/></div>
            <div><b>{ props.name }</b></div>
            <div>{ props.type }</div>
            <div>{ props.price }</div>
            <Link to="/restaurantPage">To Restaurant</Link>
        </div>
    )
}

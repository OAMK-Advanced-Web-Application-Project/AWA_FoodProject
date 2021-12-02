import Axios from 'axios'
import React from 'react'
import styles from './searchView.module.css'
import Constants from "../Constants.json";
import jwt from "jsonwebtoken";

export default function SearchResult(props) {

    Axios.defaults.withCredentials = true;

    const decodedToken = jwt.decode(props.jwt);
    console.log(decodedToken);
    
    const Idata= async (event) => {
        event.preventDefault();
        const result = await Axios.get(Constants.API_ADDRESS + "/fetchData/restaurants");
        console.log(result);
      };
            

    return (
        <div className={styles.restaurant}>
            <button onClick={Idata}>Click</button>
            <div><img src={`./images/${props.image}`} alt={"restaurant"}/></div>
            <div className={styles.name}> { props.name } </div>
            <div className={styles.type}> { props.type } </div>
            <div className={styles.price}> { props.price } </div>
        </div>
    )
}
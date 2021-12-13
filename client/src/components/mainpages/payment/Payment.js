import React, { useState, useEffect} from 'react';
import {useParams} from "react-router-dom";
import Axios from "axios";
import Constants from "../../Constants.json";

export default function Payment(){

    let { id } = useParams();
    const [orderStatus, setOrderStatus] = useState();

    useEffect(()=>{
        Axios.get(Constants.API_ADDRESS + `/getOrder/${id}`).then(
            (response) =>{
            response.data.map(e =>{
                setOrderStatus(e.status);
            }) 
            }
        );
    }, []);

    return (
        <div>
            <h1>Payment Confirmed!</h1>
            <div>
            <h2>Order Status: {orderStatus}</h2>
            </div>
        </div>
    )
}

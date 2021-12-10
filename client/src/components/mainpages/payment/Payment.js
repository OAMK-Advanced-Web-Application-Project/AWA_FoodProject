import React, { useState } from 'react'
import Axios from "axios";
import jwt from "jsonwebtoken";


export default function Payment(){
    const [orderStatus, setOrderStatus] = useState();

    const jwtStorage = localStorage.getItem("token");
    const decodedToken = jwt.decode(jwtStorage);
    const loggedInUserId = decodedToken.user.iduser;

    const getOrder = async(event) =>{
        event.preventDefault();
        const result = await Axios.get("http://localhost:3001/getOrder");
        const orderStatus = result.data.map(result =>(
            result.status
        ))
         

        setOrderStatus(orderStatus);
    };

    return (
        <div>
            <h1>Payment Confirmed!</h1>
            <div>
            <div>
                <button onClick={getOrder}>Check Order Status</button>
            </div>
            <h2>Order Status: {orderStatus}</h2>
            </div>
        </div>
    )
}

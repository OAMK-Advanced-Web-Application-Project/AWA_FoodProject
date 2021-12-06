import React, { useState } from 'react'
import Axios from "axios";
import jwt from "jsonwebtoken";


export default function Payment(){
    const [orderData, setOrderData] = useState([]);

    const jwtStorage = localStorage.getItem("token");

    const decodedToken = jwt.decode(jwtStorage);

    

    const getOrder = async(event) =>{
        event.preventDefault();
        const result = await Axios.get("http://localhost:3001/getOrder")
        setOrderData(result.data);    
    };

    return (
        <div>
            <h1>Payment Confirmed!</h1>
            <div><button onClick={getOrder}>See Order</button></div>
            <div>
                <table>
                    <tbody>
                        {orderData.map(t=>
                            <tr>
                                <td>{t.iduser}</td>
                                <td>{t.price}</td>
                                <td>{t.idrestaurant}</td>
                            </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

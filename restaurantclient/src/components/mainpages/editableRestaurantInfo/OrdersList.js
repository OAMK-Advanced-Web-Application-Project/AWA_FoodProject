
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Axios from "axios";
import { Link } from "react-router-dom";
import Constants from "../../Constants.json";

export default function OrdersList() {

    let { id } = useParams();
    const [orderList, setOrderList] = useState([]);

    useEffect(() => {
        Axios.get(Constants.API_ADDRESS + `/getOrdersRestaurant/${id}`).then(
            (response) => {
                setOrderList(response.data)
            }
        )
    }, [])


    return (
        <div>
            <div>
                {orderList && orderList.map((i) => {
                    return <div>
                        <Link to={`/orderPage/${i.idorder}`}>Go To Order</Link>
                    </div>            
                })}
            </div>
        </div>
    )
}

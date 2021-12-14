import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Axios from "axios";
import { Link } from "react-router-dom";
import Constants from "../../Constants.json";

export default function OrdersList() {
    let { id } = useParams();
    const [orderList, setOrderList] = useState([]);
    const [selctedState, setselected ] = useState();

    useEffect(() => {
        Axios.get(Constants.API_ADDRESS + `/getOrdersRestaurant/${id}`).then(
            (response) => {
                setOrderList(response.data)
            }
        )
    }, [])



    const confirmOrder = async (event) => {
        event.preventDefault();
        try {
            const result = await Axios.post(Constants.API_ADDRESS + '/confirmorder', {
                orderid: event.target.btnConfirm.value
            })
            console.log(result);
            window.location.reload(false);
        } catch (error) {
            console.error(error);
        }
    }

    const setOrderStatus = async (event) => {
        event.preventDefault();
        try {
            const result = await Axios.post(Constants.API_ADDRESS + '/setOrder', {
                orderid: event.target.btnSetStatus.value,
                status: event.target.selected.value
            })
            console.log(result);
            window.location.reload(false);
        } catch (error) {
            console.error(error);
        }
    }

    const handleChange = (e) =>{
        setselected(e.target.value);
    }

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

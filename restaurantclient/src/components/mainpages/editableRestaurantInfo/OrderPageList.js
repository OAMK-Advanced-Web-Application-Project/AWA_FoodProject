import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Axios from "axios";
import Constants from "../../Constants.json";

export default function OrderPageList(){
    let {idorder} = useParams();
    const [orderDetails, setOrderDetails] = useState([]);
    const [orderStatus, setOrderStatus] = useState("");
    const [selectedStatus, setSelectedStatus] = useState(" ")
    const idOrder = orderDetails.map((i) => i.idorder);

    useEffect(() => {
        Axios.get(Constants.API_ADDRESS + `/getOrderDetails/${idorder}`).then(
            (response) => {
                setOrderDetails(response.data)
            }
        )
    }, [])

    useEffect(() => {
        Axios.get(Constants.API_ADDRESS + `/getStatus/${idorder}`).then(
            (response) => {
                const status = response.data.map((i) => i.status);
                setOrderStatus(status)
            }
        )
    }, [])

    const handlingOnChange = (event)=>{
        setSelectedStatus(event.target.value);
    }


    const setStatus = async (event) =>{
        event.preventDefault();
        try{
            const result = await Axios.post(Constants.API_ADDRESS + "/setStatus", {
                status: selectedStatus,
                idorder: idOrder
            })
            console.log(result);
            console.log(result.data);
            setOrderStatus(selectedStatus);
        } catch (error){
            console.error(error.message);
        }
        
    }
    
    return (
        <div>
            <div>
                {orderDetails && orderDetails.map((i) =>{
                    return <div>
                        <table>
                            <tr>Order ID: {i.idorder}</tr>
                            <tr>Name: {i.firstname} {i.lastname}</tr>
                            <tr>Address: {i.address}</tr>
                            <tr>City: {i.city}</tr>
                            <tr></tr>
                        </table>
                    </div>
                })}
            </div>
            <div>
                {orderDetails && orderDetails.map((i)=>{
                    return <table>
                        <tr>{i.productname}</tr>
                    </table>
                })}
            </div>
            <div>
                <h3>Status: {orderStatus}</h3>  
            </div>
                <div>
                    <form onSubmit={setStatus}>
                        <label>
                            Set Status:
                            <select value={selectedStatus} onChange={handlingOnChange}>
                                <option value="Confirmed">Confirm</option>
                                <option value="Preparing">Preparing</option>
                                <option value="Ready for delivery">Ready for delivery</option>
                                <option value="Delivering">Delivering</option>
                                <option value="Delivered">Delivered</option>
                            </select>
                        </label>
                        <input type="submit" value="Submit"></input>
                    </form>
                </div>
        </div>
    )
}

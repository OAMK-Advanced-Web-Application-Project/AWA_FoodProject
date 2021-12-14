import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Axios from "axios";
import Constants from "../../Constants.json";

export default function OrderPageList(){
    let {idorder} = useParams();
    const [orderDetails, setOrderDetails] = useState([]);
    const [orderStatus, setOrderStatus] = useState("");

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



    const setStatus = async (event) =>{
        event.preventDefault();
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
                    <h3>Set Status:</h3>
                    <form onSubmit={setStatus}>
                        <input type="submit" name="status" value="Confirm"></input>
                        <input type="submit" name="status" value="Preparing"></input>
                        <input type="submit" name="status" value="Ready for delivery"></input>
                        <input type="submit" name="status" value="Delivering"></input>
                        <input type="submit" name="status" value="Delivered"></input>
                    </form>
                </div>
        </div>
    )
}

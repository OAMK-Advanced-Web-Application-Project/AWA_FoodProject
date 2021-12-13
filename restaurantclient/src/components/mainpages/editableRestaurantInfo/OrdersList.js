import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import Constants from "../../Constants.json";

export default function OrdersList() {

  let { id } = useParams();
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    Axios.get(Constants.API_ADDRESS + `/getOrderRestaurant/${id}`).then((response) => {
      console.log(response);
      setOrderList(response.data);
    });
  }, []);

  const confirmOrder = (orderid) => {
    Axios.post(Constants.API_ADDRESS + "/confirmOrder", {
      orderid: orderid,
    });
  };
  return (
    <div>
      <div>
        {orderList &&
          orderList.map((i) => {
            return (
              <table>
                <tr>Order-ID: {i.idorder}</tr>
                <tr>
                  Name: {i.firstname} {i.lastname}
                </tr>
                <tr>Adress: {i.adress}</tr>
                <tr>
                  Satus: {i.status}
                  <button
                    className="btnConfirm"
                    onClick={confirmOrder(i.idorder)}
                  >
                    Confirm Order
                  </button>
                </tr>
              </table>
            );
          })}
      </div>
    </div>
  );
}

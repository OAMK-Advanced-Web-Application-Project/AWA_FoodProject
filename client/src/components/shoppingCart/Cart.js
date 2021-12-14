import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Axios from "axios";
import Constants from '../Constants.json';
import jwt from "jsonwebtoken";

export default function Cart({ cart, setCart, userID }) {
    const jwtStorage = localStorage.getItem("token");
    const decodedToken = jwt.decode(jwtStorage);
    const [adress, setAdress] = useState("");
    const [city, setCity] = useState("");

    const getTotalSum = () => {
        return cart.reduce((sum, { price, quantity }) => sum + price * quantity, 0);
    }

    const removeFromCart = (productToRemove) => {
        setCart(cart.filter((product) => product !== productToRemove))
    }

    const clearCart = () => {
        setCart([]);
    }

    const handleAdress = (event) => {
        setAdress(event.target.value);
    }

    const handleCity = (event) => {
        setCity(event.target.value);
    }



    // const setQuantity = (product, amount) =>{
    //     const newCart = [...cart];
    //     newCart.find(item => item.id === product.id).quantity = amount;
    //     setCart(newCart);
    // }

    const createOrder = () => {
        cart.forEach((item) =>{
            const productname = item.productname;
            const restaurantID = item.idrestaurant;
            const quantity = item.quantity;
            const price = item.price;
            Axios.post(Constants.API_ADDRESS + "/createOrder", {
                restaurantID: restaurantID,
                userID: userID,
                price: price,
                adress: adress,
                city: city,
                productname: productname,
                quantity: quantity
                })
            }    
        )
    }



return (
    <>
        <h1>Cart</h1>
        {cart.length > 0 && (
            <button onClick={clearCart}>Clear Cart</button>
        )}

        <div>
            {cart.map((menu, idmenu) => (
                <div key={idmenu}>
                    <h3>{menu.productname}</h3>
                    <h4>€{menu.price}</h4>
                    <h4> x{menu.quantity} </h4>
                    {/*<input value={product.quantity} onChange={(e) =>
                        setQuantity(product, parseInt(e.target.value))}/>*/}
                    <button onClick={() => removeFromCart(menu)}>Remove</button>
                </div>
            ))}
        </div>
        <div>Total Cost: € {getTotalSum()}

            {cart.length > 0 && (
                <button onClick={createOrder}><Link to={`/payment/${decodedToken.user.iduser}`} className="payBtn">Confirm payment</Link></button>
            )}
        </div>
        <div>
            <form>
                <h2>Adress</h2>
                <input onChange={handleAdress} type="text" />
                <h2>City</h2>
                <input onChange={handleCity} type="text" />
            </form>
        </div>

    </>
)
            }

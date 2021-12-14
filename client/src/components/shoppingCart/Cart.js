import React from 'react'
import { Link } from 'react-router-dom'
import Axios from "axios";
import Constants from '../Constants.json';
import jwt from "jsonwebtoken";

export default function Cart({cart, setCart, userID}) {
    const jwtStorage = localStorage.getItem("token");
    const decodedToken = jwt.decode(jwtStorage);

    const getTotalSum = () =>{
        return cart.reduce((sum, {price, quantity}) => sum + price * quantity, 0);
    }

    const removeFromCart = (productToRemove) =>{
        setCart(cart.filter((product) => product !== productToRemove))
    }

    const clearCart = () =>{
        setCart([]);
    }

    // const setQuantity = (product, amount) =>{
    //     const newCart = [...cart];
    //     newCart.find(item => item.id === product.id).quantity = amount;
    //     setCart(newCart);
    // }

    const createOrder = () =>{
        const productname = cart.map((product)=>(product.productname));
        const restaurantID = cart.map((product)=>(product.idrestaurant));
        Axios.post(Constants.API_ADDRESS + "/createOrder",{
            restaurantID : restaurantID,
            userID : userID,
            price : getTotalSum(),
            productname : productname
        }).then((response) =>{
            console.log(response)
            
        });
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


        </>
    )
}

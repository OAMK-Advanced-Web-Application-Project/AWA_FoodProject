import React from 'react'
import { Link } from 'react-router-dom'
import Axios from "axios";
import Constants from '../Constants.json';

export default function Cart({cart, setCart, userID}) {
    const getTotalSum = () =>{
        return cart.reduce((sum, {price, quantity}) => sum + price * quantity, 0);
    }

    const removeFromCart = (productToRemove) =>{
        setCart(cart.filter((product) => product !== productToRemove))
    }

    const clearCart = () =>{
        setCart([]);
    }

    const setQuantity = (product, amount) =>{
        const newCart = [...cart];
        newCart.find(item => item.id === product.id).quantity = amount;
        setCart(newCart);
    }

    const createOrder = () =>{
        const [products] = cart.map((product)=>(product.name));
        Axios.post(Constants.API_ADDRESS + "/createOrder",{
            restaurantID : cart[0].restaurantID,
            userID : userID,
            price : getTotalSum(),
            [products] : products
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
                {cart.map((product, id) => (
                <div key={id}>
                    <h3>{product.name}</h3>
                    <h4>€{product.price}</h4>
                    <h4> x{product.quantity} </h4>
                        {/*<input value={product.quantity} onChange={(e) =>
                        setQuantity(product, parseInt(e.target.value))}/>*/}
                    <button onClick={() => removeFromCart(product)}>Remove</button>
                </div>
                ))}
            </div>
            <div>Total Cost: € {getTotalSum()}

            {cart.length > 0 && (
                <button onClick={createOrder}><Link to="/payment" className="payBtn">Confirm payment</Link></button>
            )}
            </div>


        </>
    )
}

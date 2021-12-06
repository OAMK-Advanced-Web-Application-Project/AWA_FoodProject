import React, {useState} from 'react'
import { useEffect } from "react";
import Cart from './Cart'
import AdressInput from './AdressInput';
import jwt from "jsonwebtoken";



export default function TestCartPage() {

    const decodedToken = jwt.decode(props.jwt);
    console.log(decodedToken)
    
    const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart') || '[]');
    const [cart, setCart] = useState(cartFromLocalStorage);

    useEffect(()=>{
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart])

    return (
        <div>
            <div>
            <Cart
            cart = {cart}
            setCart = {setCart}/>
            </div>
            <div>
            <AdressInput
            id = {100}/>
            </div>
        </div>
    )
}

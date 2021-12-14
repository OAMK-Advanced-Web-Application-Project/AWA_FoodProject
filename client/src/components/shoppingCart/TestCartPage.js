import React, {useState} from 'react'
import { useEffect } from "react";
import Cart from './Cart'
import AdressInput from './AdressInput';
import jwt from "jsonwebtoken";



export default function TestCartPage() {

    const jwtStorage = localStorage.getItem("token");

    const decodedToken = jwt.decode(jwtStorage);

    console.log(decodedToken);
    console.log(decodedToken.user.iduser);
    

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
            setCart = {setCart}
            userID = {decodedToken.user.iduser}/>
            </div>
            <div>
            <AdressInput/>
            </div>
        </div>
    )
}

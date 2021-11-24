import React, {useState} from 'react'
import { useEffect } from "react";
import Cart from './Cart'


export default function TestCartPage() {
    
    const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart') || '[]');
    const [cart, setCart] = useState(cartFromLocalStorage);

    useEffect(()=>{
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart])

    return (
        <div>
            <Cart
            cart = {cart}
            setCart = {setCart}/>
        </div>
    )
}
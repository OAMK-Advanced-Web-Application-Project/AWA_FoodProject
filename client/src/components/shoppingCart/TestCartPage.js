import React, {useState} from 'react'
import Cart from './Cart'

export default function TestCartPage() {
    const [cart, setCart] = useState([]); 

    return (
        <div>
            <Cart
            cart = {cart}
            setCart = {setCart}/>
        </div>
    )
}

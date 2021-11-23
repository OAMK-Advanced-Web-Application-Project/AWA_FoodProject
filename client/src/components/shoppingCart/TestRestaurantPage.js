import React, {useState} from 'react'
import { useEffect } from "react";
import Products from './Products';

const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart') || '[]')

export default function TestRestaurantPage() {
    const [cart, setCart] = useState(cartFromLocalStorage);
    
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart])
  
    return (
        <div>
            <Products
            cart={cart}
            setCart={setCart}
            />
        </div>
    )
}

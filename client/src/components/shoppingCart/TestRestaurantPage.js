import React, {useState} from 'react'
import { useEffect } from "react";
import Products from './Products';



export default function TestRestaurantPage() {
  const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart') || '[]');
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

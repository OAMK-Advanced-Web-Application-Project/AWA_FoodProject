import React, {useState} from "react";

import Placeholderdata from './placeholderData.json'


export default function Products({setCart, cart}) {
    const [products] = useState(Placeholderdata.menuItems)


    const addToCart = (props) =>{
        let itemInCart = cart.find((item) => props.id === item.id);
        let newCart = [...cart];

        if(itemInCart){
            itemInCart.quantity++;
        }else{
            itemInCart ={
                ...props,
                quantity: 1,
            }
            newCart.push(itemInCart);
        }
        setCart(newCart)
    }

    return (
        <div>
            {products.map((product, id) =>(
                <div key={id}>
                    <h3>{product.name}</h3>
                    <h4>€{product.price}</h4>
                    <button onClick={() => addToCart(product)}>Add to Cart</button>
                </div>
            ))}
        </div>
    )
}

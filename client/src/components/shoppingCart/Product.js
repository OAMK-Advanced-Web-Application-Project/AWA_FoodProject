import React from 'react'

export default function Product(props, {setCart, cart}) {


    return (
        <div>
            <div>{props.name}</div>
            <div>€ {props.price}</div>
            <button onClick={() => addToCart(props)}>Add to Cart</button>
        </div>
    )
}

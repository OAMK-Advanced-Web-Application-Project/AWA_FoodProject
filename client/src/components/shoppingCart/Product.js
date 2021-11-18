import React from 'react'

export default function Product(props, {setCart, cart}) {

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
            <div>{props.name}</div>
            <div>€ {props.price}</div>
            <button onClick={() => addToCart(props)}>Add to Cart</button>
        </div>
    )
}

import React, { useState } from 'react'
import { useContext } from 'react';
import MealItemForm from './menuItemForm'
import CartContext from './cart-context';

export default function MenuItem(props) {
    const cartCtx = useContext(CartContext);

    const price = `$${props.price.toFixed(2)}`;

    const addToCartHandler = amount =>{
        cartCtx.addItem({
            id: props.id,
            name: props.name,
            amount: amount,
            price: props.price
        });
    };

    return (
        <div className={"menuItem"}>
            <div><b>{props.name}</b></div>
            <div>{props.price}</div>
            <div>
            <MealItemForm onAddToCart={addToCartHandler}/>
            </div>
        </div>

    )
}


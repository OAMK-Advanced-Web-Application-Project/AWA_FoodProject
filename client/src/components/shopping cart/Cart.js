import React, { useState } from 'react'
import {useContext} from 'react';
import CartContext from './cart-context';
import CartItem from './cartItem';

export default function Cart() {
    	const cartCtx = useContext(CartContext);

        const totalAmount =`$${cartCtx.totalAmount.toFixed(2)}`;
        const hasItems = cartCtx.items.length > 0;

        const cartItemRemoveHandler = (id) =>{
            cartCtx.removeItem(id);
        };

        const cartItemAddHandler = (item)=>{
            cartCtx.addItem(item);
        };

        const cartItems = (
            <ul>
                {cartCtx.items.map((item)=>(
                    <CartItem
                     key={item.id}
                     name={item.name}
                     amount={item.amount}
                     price={item.price}
                     onRemove={cartItemRemoveHandler.bind(null, item.id)}
                     onAdd={cartItemAddHandler.bin(null, item)}
                    />
                ))}
            </ul>
        );

    return (
        <div>
            <div>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {hasItems && <button>Order</button>}
        </div>
        
    )
}

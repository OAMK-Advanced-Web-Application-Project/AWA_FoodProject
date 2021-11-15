import React from 'react'

export default function cartItem(props) {
const price = `$${props.price.toFixed(2)}`;

    return (
        <li>
            <div>
                <h2>{props.name}</h2>
                <span>{price}</span>
                <span>x {props.amount}</span>
            </div>
            <div>
                <button onClick={props.onRemove}>-</button>
                <button onClick={props.onAdd}>+</button>
            </div>
        </li>
    )
}

import React from 'react'

export default function Cart({cart, setCart}) {
    const getTotalSum = () =>{
        return cart.reduce((sum, {price, quantity}) => sum + price * quantity, 0);
    }

    const removeFromCart = (productToRemove) =>{
        console.log("bruh_2")
        setCart(cart.filter((product) => product !== productToRemove))
    }

    const clearCart = () =>{
        console.log("bruh_1")
        setCart([]);
    }

    const setQuantity = (product, amount) =>{
        const newCart = [...cart];
        newCart.find(item => item.id === product.id).quantity = amount;
        setCart(newCart);
    }


    return (
        <>
            <h1>Cart</h1>
            {cart.length > 0 && (
                <button onClick={clearCart}>Clear Cart</button>
            )}
            <div>
                {cart.map((product, id) => (
                <div key={id}>
                    <h3>{product.name}</h3>
                    <h4>€{product.price}</h4>
                    <h4> x{product.quantity} </h4>
                        {/*<input value={product.quantity} onChange={(e) =>
                        setQuantity(product, parseInt(e.target.value))}/>*/}
                    <button onClick={() => removeFromCart(product)}>Remove</button>
                </div>
                ))}
            </div>
            <div>Total Cost: € {getTotalSum()}</div>
        </>
    )
}

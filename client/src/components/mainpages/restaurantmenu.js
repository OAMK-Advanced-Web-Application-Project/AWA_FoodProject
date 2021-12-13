import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import Constants from "../Constants.json";
import styles from "./userMainPage.module.css";

export default function Restaurantmenu() {
  const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart') || '[]');

  let { idrestaurant } = useParams();
  const [menuobject, setMenuObject] = useState();
  const [cart, setCart] = useState(cartFromLocalStorage);


  useEffect(() => {
    Axios.get(Constants.API_ADDRESS + `/restaurantById/${idrestaurant}`).then(
      (response) => {
        console.log(response.data);
        setMenuObject(response.data);
      }
    );
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart])

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

  return <div>{menuobject && menuobject.map((menu, idmenu) => {
      return (
          <div key={idmenu} className={styles.restaurant}>
              <h2>{menu.productname}</h2>
              <h3>{menu.description}</h3>
              <h3>{menu.price}</h3>
              <button onClick={() => addToCart(menu)}></button>
          </div>
      )
  })}</div>;
}

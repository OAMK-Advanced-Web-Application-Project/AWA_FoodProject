import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import Constants from "../Constants.json";
import styles from "./userMainPage.module.css";
import { Image } from "cloudinary-react";

export default function Restaurantmenu() {
  let { idrestaurant } = useParams();
  const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]");
  const [cart, setCart] = useState(cartFromLocalStorage);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const [menuobject, setMenuObject] = useState();

  useEffect(() => {
    Axios.get(Constants.API_ADDRESS + `/restaurantById/${idrestaurant}`).then(
      (response) => {
        console.log(response.data);
        setMenuObject(response.data);
      }
    );
  }, []);

  const addToCart = (props) => {
    let itemInCart = cart.find((item) => props.idmenu === item.idmenu);
    let newCart = [...cart];
    console.log(props);
    if (itemInCart) {
      itemInCart.quantity++;
    } else {
      itemInCart = {
        ...props,
        quantity: 1,
      };
      newCart.push(itemInCart);
    }
    setCart(newCart);
  };

  return (
    <div>
      {menuobject &&
        menuobject.map((menu, idmenu) => {
          return (
            <div key={idmenu} className={styles.restaurant}>
              <div>
                {" "}
                <Image cloudName="dwbi2ichj" publicId={menu.image}></Image>
              </div>{" "}
              <h2>{menu.productname}</h2>
              <h3>{menu.description}</h3>
              <h3>{menu.price}</h3>
              <button onClick={() => addToCart(menu)}></button>
            </div>
          );
        })}
    </div>
  );
}

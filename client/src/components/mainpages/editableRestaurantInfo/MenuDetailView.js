import styles from "./restaurantInfo.module.css";
import React from 'react';
import { useParams } from 'react-router-dom';

export default function MenuDetailView(props) {

  const result = useParams();

  const menu = props.menus.find(menu => menu.id === result.menuId);
  if(menu == null) {
    return <div></div>
  }

  return (
    <div>
      <table>
        <tr>
          <td>Dish name</td>
          <td>{menu.plateName}</td>
        </tr>
        <tr>
          <td>Description</td>
          <td>{menu.desc}</td>
        </tr>
        <tr>
          <td>Price</td>
          <td>{menu.price}</td>
        </tr>
      </table>

    </div>
  )
}

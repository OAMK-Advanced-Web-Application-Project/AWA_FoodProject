import styles from "./restaurantInfo.module.css";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import Constants from "../../Constants.json";
import { Image } from "cloudinary-react";

export default function MenuList() {
  let { id } = useParams();
  const [listOfMenus, setListOfMenus] = useState([]);

  useEffect(() => {
    Axios.get(Constants.API_ADDRESS + `/getMenuItems/${id}`).then(
      (response) => {
        setListOfMenus(response.data);
      }
    );
  }, []);

  return (
    <div className={styles.menuListView}>
      {" "}
      <div>
        {listOfMenus &&
          listOfMenus.map((menu, key) => {
            return (
              <div key={key} className={styles.menuListElement}>
{/*                 <Image cloudName="dwbi2ichj" publicId={imageURL}></Image> */}
                <div>{menu.productname}</div>
                <div>{menu.description}</div>
                <div>{menu.price}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

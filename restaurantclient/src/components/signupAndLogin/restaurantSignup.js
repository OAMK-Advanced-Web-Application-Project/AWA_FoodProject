import { useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import styles from "./signup.module.css";
import Constants from "../Constants.json";
import { Image } from "cloudinary-react";

export default function RestaurantSignup() {
  const [restaurantnameReg, setRestaurantnameReg] = useState("");
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [addressReg, setAddressReg] = useState("");
  const [operatinghoursReg, setOperatinghoursReg] = useState("");
  const [typeReg, setTypeReg] = useState("");
  const [pricelevelReg, setPriceLevel] = useState("");
  const [imageSelected, setImageSelected] = useState("");
  const [showImage, setShowImage] = useState("");

  const uploadImage = () => {
    Axios.defaults.withCredentials = true;

    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "ujyz5zuo");

    Axios.post(
      "https://api.cloudinary.com/v1_1/dwbi2ichj/image/upload",
      formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      }
    ).then((response) => {
      console.log(response.data.url);
      setShowImage(response.data.url);
    });
  };

  const addRestaurant = () => {
    Axios.post(Constants.API_ADDRESS + "/createRestaurant", {
      restaurantname: restaurantnameReg,
      username: usernameReg,
      password: passwordReg,
      address: addressReg,
      operatinghours: operatinghoursReg,
      type: typeReg,
      pricelevel: pricelevelReg,
      image: showImage,
    }).then((response) => {
      console.log("done");
    });
  };

  return (
    <div class={styles.background}>
      <div class={styles.signupForm}>
        <div className={styles.Signup}>Signup</div>
        <label>Restaurant name</label>
        <input
          type="text"
          onChange={(event) => {
            setRestaurantnameReg(event.target.value);
          }}
        />
        <label>Username</label>
        <input
          type="text"
          onChange={(event) => {
            setUsernameReg(event.target.value);
          }}
        />
        <label>Password</label>
        <input
          type="text"
          onChange={(event) => {
            setPasswordReg(event.target.value);
          }}
        />
        <label>Address</label>
        <input
          type="text"
          onChange={(event) => {
            setAddressReg(event.target.value);
          }}
        />
        <label>Operating hours</label>
        <input
          type="text"
          onChange={(event) => {
            setOperatinghoursReg(event.target.value);
          }}
        />
        <label>Restaurant type</label>
        <input
          type="text"
          onChange={(event) => {
            setTypeReg(event.target.value);
          }}
        />
        <label>Price level</label>
        <input
          type="text"
          onChange={(event) => {
            setPriceLevel(event.target.value);
          }}
        />
        <input
          type="file"
          onChange={(event) => {
            setImageSelected(event.target.files[0]);
          }}
        />
        <button onClick={uploadImage}> Upload Image</button>
        <Link to="/restaurantlogin">
          <button onClick={addRestaurant}> Register </button>
        </Link>
      </div>
    </div>
  );
}

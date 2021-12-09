import Axios from "axios";
import React, { useState } from "react";
import styles from "./searchView.module.css";
import Constants from "../Constants.json";
import styles1 from "./userMainPage.module.css";
import styles2 from "./searchView.module.css";

export default function SearchResult() {
  const [restaurantShow, setRestaurantShow] = useState();

  const Idata = async (event) => {
    event.preventDefault();
    const result = await Axios.get(
      Constants.API_ADDRESS + "/fetchData/restaurants",
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    const restaurantArray = result.data;
    console.log(restaurantArray);
    const restaurantShow = restaurantArray.map((elem) => ({
      id: elem.idrestaurant,
      restaurantname: elem.restaurantname,
      type: elem.type,
      pricelevel: elem.pricelevel,
    }));
    setRestaurantShow(restaurantShow);
  };

  window.addEventListener("load", Idata);

  return (
    <div className={styles.restaurant}>
      <input
          class="SearchBox"
          className={styles1.SearchBox}
          type="text"
/*           onChange={this.onSearchChange}
          value={this.state.SearchString} */
          placeholder="Search for restaurants..."
        />
      {" "}
      <div>
        {restaurantShow.map((show, id) => (
          <div key={id}>
            <h3>{show.restaurantname}</h3>
            <h4>€{show.type}</h4>
            <h4>€{show.pricelevel}</h4>
          </div>
        ))}
      </div>
      {/*       <div>
        <img src={`./images/${props.image}`} alt={"restaurant"} />
      </div> 
      <div className={styles.name}> {props.name} </div>
      <div className={styles.type}> {props.type} </div>
      <div className={styles.price}> {props.price} </div> */}
    </div>
  );
}

/* 
import SearchResult from "./searchResult";
import placeholderData from "./placeholderData.json";

 function SearchView(props) {
  return (
    <div className={styles2.SearchView}>
      {props.restaurants.map((restaurants) => (
        <SearchResult key={restaurants.id} {...restaurants} />
      ))}
    </div>
  );
} 

  onSearchChange = (event) => {
    this.setState({ SearchString: event.target.value });
  };

class UserMainPage extends React.Component {
  constructor(props) {
    
    super(props);
    this.state = {
      restaurants: placeholderData.restaurants,
      SearchString: "",
    };
  }


  render() {
    return (
      <div>
        <input
          class="SearchBox"
          className={styles1.SearchBox}
          type="text"
          onChange={this.onSearchChange}
          value={this.state.SearchString}
          placeholder="Search for restaurants..."
        />
        <div className={styles2.SearchView}>
          <SearchView
            restaurants={this.state.restaurants.filter((restaurant) =>
              restaurant.name.toLowerCase().includes(this.state.SearchString.toLowerCase())
            )}
          />
        </div>
      </div>
    );
  }
}

export default UserMainPage;
 */

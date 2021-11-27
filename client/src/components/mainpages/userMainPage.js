import React from "react";
import styles1 from "./userMainPage.module.css";
import styles2 from "./searchView.module.css";
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

class UserMainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: placeholderData.restaurants,
      SearchString: "",
    };
  }

  onSearchChange = (event) => {
    this.setState({ SearchString: event.target.value });
  };

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
              restaurant.name.includes(this.state.SearchString)
            )}
          />
        </div>
      </div>
    );
  }
}

export default UserMainPage;

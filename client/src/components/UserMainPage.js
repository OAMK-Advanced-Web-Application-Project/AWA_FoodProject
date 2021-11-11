import React from 'react'
import "./UserMainPage.css"
import "./searchView.css"
import SearchResult from './searchResult'
import placeholderData from './placeholderData.json'

function SearchView(props){
    return(
        <div className="SearchView">
            {
                props.restaurants.map(restaurants => <SearchResult key={restaurants.id} {...restaurants} />)
            }
        </div>
    )
}

class UserMainPage extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            restaurants: placeholderData.restaurants,
            SearchString: ""
        }
    }

    onSearchChange = (event) =>{
        console.log('Keyboard event');
        console.log(event.target.value);
        this.setState({ SearchString: event.target.value })
    }

    render() {
        return (
            <div>
                <div className="UserMainPageSearch">
                    <input class="SearchBox" type="text" onChange={ this.onSearchChange } value={ this.state.SearchString } placeholder="Search for restaurants..."/>
                </div>
                <div className="SearchView">
                    <SearchView restaurants={ this.state.restaurants.filter((restaurant) => restaurant.name.includes(this.state.SearchString)) } />
                </div>
            </div>
        )
    }
}

export default UserMainPage;
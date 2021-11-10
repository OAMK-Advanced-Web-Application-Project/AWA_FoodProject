import React from 'react'
import NavbarNoSearch from './NavbarNoSearch'
import "./mainPage.css"
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

class mainPage extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            restaurants: placeholderData.restaurants
        }
    }

    

    render() {
        return (
            <div>
                <NavbarNoSearch />
                <div className="mainPageSearch">
                    <input class="SearchBox" type="text" placeholder="Search for restaurants..."/>
                </div>
                <div className="SearchView">
                    <SearchView restaurants={ this.state.restaurants } />
                </div>
            </div>
        )
    }
}

export default mainPage;
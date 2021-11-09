import React from 'react'
import NavbarNoSearch from './NavbarNoSearch'
import "./mainPage.css"

export default function mainPage() {
    return (
        <div>
            <NavbarNoSearch />
            <div className="mainPageSearch">
                <input class="SearchBox" type="text" placeholder="Search for restaurants..."/>
            </div>
            <div className="results">
                <div>ei ole :(</div>
            </div>
        </div>
    )
}

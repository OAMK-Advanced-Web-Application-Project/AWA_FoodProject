import React from 'react'
import './UserMainPage.css'

export default function searchResult(props) {
    return (
        <div className="restaurant">
            <div><img src={`./images/${props.image}`} alt={"restaurant"}/></div>
            <div><b>{ props.name }</b></div>
            <div>{ props.type }</div>
            <div>{ props.price }</div>
        </div>
    )
}

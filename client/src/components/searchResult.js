import React from 'react'
import './mainPage.css'

export default function searchResult(props) {
    return (
        <div className="restaurant">
            <div><img src={`./images/${props.image}`}/></div>
            <div>{ props.name }</div>
            <div>{ props.type }</div>
            <div>{ props.price }</div>
        </div>
    )
}

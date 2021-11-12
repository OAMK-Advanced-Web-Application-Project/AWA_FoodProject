import React from 'react'
import styles from './searchView.module.css'

export default function searchResult(props) {
    return (
        <div className={styles.restaurant}>
            <div><img src={`./images/${props.image}`} alt={"restaurant"}/></div>
            <div className={styles.name}> { props.name } </div>
            <div className={styles.type}> { props.type } </div>
            <div className={styles.price}> { props.price } </div>
        </div>
    )
}

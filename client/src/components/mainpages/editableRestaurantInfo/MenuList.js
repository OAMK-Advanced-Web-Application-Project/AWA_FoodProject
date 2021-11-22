import styles from "./restaurantInfo.module.css"
import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function menuList(props) {
  return (
    <div class={styles.menuListView}>
      <div class={styles.menuList}>
      { props.menu.map(menu =>
        <Link to={ menu.id }>
          <div class={styles.menuListElement}>{menu.plateName}</div>
        </Link>
      )}
      </div>
      <div class={styles.menuDetail}>
        <Outlet />
      </div>
    </div>
  )
}

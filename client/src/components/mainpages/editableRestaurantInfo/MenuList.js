import "./restaurantInfo.css";
import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function menuList(props) {
  return (
    <div className="menuListView">
      <div className="menuList">
      { props.menu.map(menu =>
        <Link to={ menu.id }>
          <div className="menuListElement">{menu.plateName}</div>
        </Link>
      )}
      </div>
      <div className="menuDetail">
        <Outlet />
      </div>
    </div>
  )
}

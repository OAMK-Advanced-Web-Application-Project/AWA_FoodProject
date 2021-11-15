import React from 'react'
import MenuItem from '../shoppingCart/menuItem.js'
import placeholderData from './placeholderData.json'
import CartProvider from '../shoppingCart/CartProvider';

function MenuView(props){
    return(
        <div>
            {
                props.menuItems.map(menuItems => <MenuItem key={menuItems.id} {...menuItems}/>)
            }
        </div>
    )
}

class RestaurantPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            menuItems: placeholderData.menuItems
        }

    }

    render(){
        return(
            <CartProvider>
                <MenuView menuItems={this.state.menuItems}></MenuView>
            </CartProvider>
        ) 
    }

}

export default RestaurantPage;

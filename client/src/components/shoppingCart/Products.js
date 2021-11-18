import React from "react";
import Product from './Product';
import Placeholderdata from './placeholderData.json';

const ProductsView = (props)=>{
    
    return(
        <div>
            {props.products.map(products => 
            <Product key={products.id} {...products}/>)}
        </div>
    )
}

class Products extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            products: Placeholderdata.menuItems
        }      
    }
    

    render(){
        return(
            <div>
                <ProductsView products={this.state.products}/>
            </div>
        )
    }
}

export default Products;
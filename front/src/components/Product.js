import React from 'react';
import {Link} from 'react-router-dom';
import Rating from './Rating';
import Icons from './Icons';

export default function Product(props) {
    const {product} = props;
    return (
            <div key={product._id} class="product">
              <div class="product-header">
                <img src={product.image} alt="" />
                <Icons></Icons>
              </div>
              <div class="product-footer">
                <Link to={`/product/${product._id}`}><h3>{product.name}</h3></Link>
                <Rating rating={product.rating} numReviews={product.numReviews}></Rating>
                <h4 class="price">${product.price}</h4>
              </div>
            </div>
    )
}


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from '../components/footer';
import HeaderProduct from '../components/HeaderProduct';
import Product from '../components/Product';

export default function ProductScreen(props) {
    const [products, setProducts] = useState([]);
    useEffect(() =>{
        const fetchData = async () =>{
            const {data} = await axios.get('/api/products');
            setProducts(data);
        };
        fetchData();
    }, []);
    const productId = props.match.params.id;
    const product = products.find((x) => x._id === props.match.params.id);
    const [qty, setQty] = useState(1);
    const addToCartHandler = () =>{
        props.history.push(`/cart/${productId}?qty=${qty}`);
    };
    if (!product) {
        return <div></div>;
    }
    return (
        <div>
            <HeaderProduct></HeaderProduct>
            <section class="section product-detail">
                <div class="details container-md">
                <div class="left">
                    <div class="main">
                    <img src={product.image} />
                    </div>
                </div>
                <div class="right">
                    <span>Home/{product.category}</span><br/>
                    <span>{product.rating} <i className="bx bxs-star"></i></span><br/>
                    <span>{product.numReviews} Views</span>
                    <h1>{product.name}</h1>
                    <h3>Seller : {product.brand} </h3>
                    <div class="price">Price : {product.price} $</div><br/>
                    <div class="price">Status : {product.countInStock > 0 ? (
                        <span style={{color: 'green'}}>In Stock</span>
                    ) : (
                        <span style={{color: 'red'}}>Unavailable</span>
                    )}
                    </div>
                    <form class="form">
                        {product.countInStock > 0 && (
                                <>
                                    <select value={qty} onChange={(e) => setQty(e.target.value)}>
                                        {[...Array(product.countInStock).keys()].map(
                                            (x) => (
                                                <option key={x + 1} value={x + 1}>
                                                    {x + 1}
                                                </option>
                                            )
                                        )}
                                    </select>
                                    <a style={{marginLeft : '5%'}}  onClick={addToCartHandler}  class="addCart">Add To Cart</a>
                                </>
                        )}
                    </form>
                    <h3>Product Detail</h3>
                    <p>{product.description}</p>
                </div>
                </div>
            </section>
            <section class="section featured">
                <div class="top container">
                    <h1>Related Products</h1>
                </div>
                <div class="product-center container">
                    {products.map((product) => (
                        <Product key={product._id} product={product}></Product>
                    ))}
                </div>
            </section>
            <Footer></Footer>
        </div>
    )
}
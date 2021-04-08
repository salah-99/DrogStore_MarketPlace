import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Product from '../components/Product';
import Footer from '../components/footer';
import Header from '../components/Header';

export default function HomeScreen() {
    const [products, setProducts] = useState([]);
    useEffect(() =>{
        const fetchData = async () =>{
            const {data} = await axios.get('/api/products');
            setProducts(data);
        };
        fetchData();
    }, []);
    return (
        <div>
            <Header></Header>
                <section class="section featured">
                    <div class="title">
                        <h1>Latest Products</h1>
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
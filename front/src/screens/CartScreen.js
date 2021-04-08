import React, { useEffect } from 'react';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../actions/cartActions';
import HeaderProduct from '../components/HeaderProduct';

export default function CartScreen(props) {

    const productId = props.match.params.id;
    const qty = props.location.search ? Number(props.location.search.split('=')[1]): 1;
    const cart = useSelector((state) => state.cart);
    const {cartItems} = cart;
    const dispatch = useDispatch();


    useEffect(() => {
        if(productId) {
            dispatch(addToCart(productId, qty));
        }
    }, [dispatch, productId, qty]);

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    };

    const checkoutHandler = () =>{
        props.history.push('/signin?redirect=shipping');
    }

    return (
        <div>
            <HeaderProduct></HeaderProduct>
            <div class="container-md cart">
                <table>
                    <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                    </tr>
                    {cartItems.map((item) => (
                        <tr>
                            <td>
                                <div class="cart-info">
                                    <img src={item.image} alt="" />
                                    <div>
                                        <p><Link to={`/product/${item.product}`}>{item.name}</Link></p>
                                        <span>Price: {item.price} $</span><br/>
                                        <Link to="" onClick={()=> removeFromCartHandler(item.product)}>remove</Link><br/><br/>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <select value={item.qty} onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                    {[...Array(item.countInStock).keys()].map((x) => (
                                        <option key={x + 1} value={x + 1}>
                                            {x + 1}
                                        </option>
                                    ))}
                                </select>
                            </td>
                            <td>
                                <span>${cartItems.reduce(() => item.price * item.qty, 0)}</span>
                            </td>
                        </tr>
                    ))}
                </table>
                <div class="total-price">
                    <table>
                        <tr>
                            <td>Quantity : </td>
                            <td>{cartItems.reduce((a, c) => a + c.qty, 0)}</td>
                        </tr>
                        <tr>
                            <td>Subtotal :</td>
                            <td>$ {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}</td>
                        </tr>
                        <tr>
                            <td>Tax :</td>
                            <td>$50</td>
                        </tr>
                        <tr>
                            <td>Total :</td>
                            <td>$250</td>
                        </tr> 
                    </table>
                    <span  onClick={checkoutHandler} class="checkout btn" disabled={cartItems.length === 0}>Proceed To Checkout</span>
                </div>
            </div>
        </div>
    );
}
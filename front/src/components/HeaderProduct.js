import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import { signout } from '../actions/userActions';

export default function HeaderProduct() {
    const cart = useSelector((state) => state.cart);
    const {cartItems} = cart;

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const dispatch = useDispatch();
    const signoutHandler = () =>{
        dispatch(signout());
    }
    return (
        <nav class="nav">
            <div class="navigation container">
                <div class="logo">
                    <Link to="/"><h1>DrogStore</h1></Link>
                </div>
                <div class="menu">
                    <div class="top-nav">
                        <div class="logo">
                            <Link to="/"><h1>DrogStore</h1></Link>
                        </div>
                        <div class="close">
                            <i class="bx bx-x"></i>
                        </div>
                    </div>
                    <ul class="nav-list">
                        { userInfo ? (
                                <li className="nav-item dropdown">
                                    <Link class="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" to="#">
                                        {userInfo.name} <i className="fa fa-caret-down"></i>{' '}
                                    </Link>
                                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li>
                                            <Link className="dropdown-item" to="/profile">User Profile</Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item" to="/orderhistory">Order History</Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item" to="/signin" onClick={signoutHandler}>Sign out</Link>
                                        </li>
                                    </ul>
                                </li>
                        ) : (
                                <li class="nav-item">
                                    <Link class="nav-link scroll-link" to="#signout">Signin</Link>
                                </li>
                        )}
                        {userInfo && userInfo.isAdmin && (
                            <li className="nav-item dropdown">
                                <Link class="nav-link dropdown-toggle" to="#admin" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" to="#">
                                    Admin{' '}<i className="fa fa-caret-down"></i>
                                </Link>
                                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li>
                                        <Link className="dropdown-item" to="/dashboard">Dashboard</Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/productlist">Products</Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/orderlist">Orders</Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/userList">Users</Link>
                                    </li>
                                </ul>
                            </li>
                        )}
                        <li class="nav-item">
                            <Link to="/cart" class="nav-link icon">
                                <i class="bx bx-shopping-bag"></i>
                                {cartItems.length > 0 && (
                                    <span className="badge">{cartItems.length}</span>
                                )}
                            </Link>
                        </li>
                    </ul>
                </div>
                <Link to="/cart" class="cart-icon">
                    <i class="bx bx-shopping-bag"></i>
                    {cartItems.length > 0 && (
                        <span className="badge">{cartItems.length}</span>
                    )}
                </Link>
                <div class="hamburger">
                    <i class="bx bx-menu"></i>
                </div>
            </div>
        </nav>
    )
}
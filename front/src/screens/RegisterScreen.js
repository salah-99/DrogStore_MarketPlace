import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import { register } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import bcn from '../img/bc1.jpg';

export default function RegisterScreen(props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const redirect = props.location.search ? props.location.search.split('=')[1]: '/';
    const userRegister = useSelector((state) => state.userRegister);
    const { userInfo, loading, error } = userRegister;

    const dispatch = useDispatch();
    const submitHandler = (e) =>{
        e.preventDefault();
        if(password !== confirmPassword){
            alert('Password and confirm password are not match');
        }else{
            dispatch(register(name, email, password));
        }
    };

    useEffect(() =>{
        if(userInfo){
            props.history.push(redirect);
        }
    }, [props.history, userInfo, redirect]);

    return (
        <div>
            <img  id="back" src={bcn}></img>
            <div id="conten">
                <div class="form sign-in" id="group" onSubmit={submitHandler}>
                    <h2 id="sin" style={{color:'#a685e2'}}>Sign Up</h2>
                    <div>
                        {loading && <LoadingBox></LoadingBox>}
                        {error && <MessageBox variant="danger">Invalid Email or Password</MessageBox>}
                    </div>
                    <label id="sinL">
                        <input type="text" name="name" placeholder="Name" required onChange={(e) => setName(e.target.value)}/>
                    </label>
                    <label id="sinL">
                        <input type="email" name="email" placeholder="Email Address" required onChange={(e) => setEmail(e.target.value)}/>
                    </label>
                    <label>
                        <input type="password" name="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)}/>
                    </label>
                    <label>
                        <input type="password" name="confirmPassword" placeholder="Confirm Password" required onChange={(e) => setConfirmPassword(e.target.value)}/>
                    </label>
                    <button className="submit" type="button" >Sign Up</button>
                    <p style={{marginLeft: '31%', color:'grey'}}>Already have an account ?</p>
                    <span id="span" style={{marginLeft: '45%', color:'#f60091'}}><Link to={`/signin?redirect=${redirect}`}>Sign In</Link></span>
                </div>
            </div>
        </div>
    )
}
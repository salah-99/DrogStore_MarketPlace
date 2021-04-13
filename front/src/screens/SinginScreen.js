import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import { signin } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import bcn from '../img/bc.jpg';

export default function SinginScreen(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);

    return (
        <div>
            <img  id="back" src={bcn}></img>
            <div id="cont">
                <div class="form sign-in" id="group">
                    <h2 id="sin" style={{color:'#f60091'}}>Sign In</h2>
                    <div>
                        {loading && <LoadingBox></LoadingBox>}
                        {error && <MessageBox variant="danger">{error}</MessageBox>}
                    </div>
                    <label id="sinL">
                        <input type="email" name="email" placeholder="Email Address" required onChange={(e) => setEmail(e.target.value)}/>
                    </label>
                    <label>
                        <input type="password" name="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)}/>
                    </label>
                    <button className="submit" id="sub" type="button" onClick={submitHandler}>Sign In</button>
                    <p style={{marginLeft: '37%', color:'grey'}}>Creat new account :</p>
                    <span id="span" style={{marginLeft: '45%', color:'#f60091'}}><Link to={`/register?redirect=${redirect}`}>Sign Up</Link></span>
                </div>
            </div>
        </div>
    )
}

import React, { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import '../../styles/pages/Login/Login.css';
import axios from 'axios';

function Login(){

    let navigate = useRef(useNavigate());
    
    const goToHome = () => {
        navigate.current('/');
    };
    
    const goToSignUp = () => {
        navigate.current('/signup');
    };
    
    const [input, setInput] = useState({
        username: '',
        password: ''
    });

    const loginHandler = () => {
        axios.post('http://localhost:3001/api/sign-in', input, {withCredentials: true})
            .then(response => console.log(response.data))
            .catch(error => console.log(error));
    };

    return(
        <div className="login-page">
            <div className="login-inner">
                <button className="login-go-to-home-btn" onClick={goToHome}>
                    <BsArrowLeft id="icon"/>
                    Return Home
                </button>
                <h1>Login</h1>
                <div className="login-input-container">

                </div>
                <button className="login-login-btn" onClick={loginHandler}>
                    Login
                </button>
                <button className="login-go-to-signup-btn" onClick={goToSignUp}>
                    Create a account
                </button>
            </div>
        </div>
    );
}

/*
Replace
----------------------------------------
<div className="login-input-container">
        <TextField
            id = 'username'
            label="Username"
            type="text"
            value={input.username}
            onChange={inputHandler}   
            margin="dense"                     
        /> 
        <TextField
            id = 'password'
            label="Password"
            type="password"
            value={input.password}
            onChange={inputHandler}
            margin="dense"
        />
    </div>

*/

export default Login;
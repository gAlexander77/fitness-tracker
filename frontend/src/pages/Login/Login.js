import React, { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { CustomTextField1 as TextField } from '../../custom-mui-components/TextField';
import { BsArrowLeft, BsFileBreakFill } from "react-icons/bs";
import { apiPath } from '../../config'; 
import axios from 'axios';
import '../../styles/pages/Login/Login.css';

const errorStyle = {color: "#cc5500", margin: "10px 0"};

function Login(){

    const [errorInfo, setErrorInfo] = useState({style: {}, text: ''});
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

    const inputHandler = (evt) => {
        setInput({
            ...input,
            [evt.target.id]: evt.target.value
        });
    };

    const loginHandler = () => {
        axios.post(apiPath("/sign-in"), input, {withCredentials: true})
            .then(_res => goToHome())
            .catch(error => {
                const errorMessage = error.response?.status === 401 
                    ? "Invalid username or password" 
                    : error.message;    
                setErrorInfo({style: errorStyle, text: errorMessage});
            });
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
                <p style={errorInfo.style}>{errorInfo.text}</p>
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

export default Login;
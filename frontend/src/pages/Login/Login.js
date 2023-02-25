import React, { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { CustomTextField1 as TextField } from '../../custom-mui-components/TextField';
import { BsArrowLeft } from "react-icons/bs";
import '../../styles/pages/Login/Login.css';

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

    const inputHandler = (evt) => {
        setInput({
            ...input,
            [evt.target.id]: evt.target.value
        });
        console.log(input);
    };

    const loginHandler = () => {
        console.log(input);
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
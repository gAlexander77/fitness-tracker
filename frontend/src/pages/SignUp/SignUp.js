import React, { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import '../../styles/pages/SignUp/SignUp.css';

function SignUp(){
    
    let navigate = useRef(useNavigate());
    
    const goToHome = () => {
        navigate.current('/');
    };
    
    const goToLogin = () => {
        navigate.current('/login');
    };

    const [input, setInput] = useState({
        username: '',
        password: '',
        verifyPassword: ''
    });

    const inputHandler = (evt) => {
        setInput({
            ...input,
            [evt.target.id]: evt.target.value
        });
        console.log(input);
    };
    
    const signUpHandler = () => {
        console.log(input);
    };

    return(
        <div className="sign-up-page">
            <div className="sign-up-inner">
                <button className="sign-up-go-to-home-btn" onClick={goToHome}>
                    <BsArrowLeft id="icon"/>
                    Return Home
                </button>
                <h1>Sign Up</h1>
                <div className="sign-up-input-container"> 
                </div>
                <button className="sign-up-sign-up-btn" onClick={signUpHandler}>
                    Sign Up
                </button>
                <button className="sign-up-go-to-login-btn" onClick={goToLogin}>
                    Already have an account
                </button>
            </div>
            
        </div>
    );
}


/*
Replace
------------------------
        <TextField
            id="username"
            label="Username"
            type="text"
            value={input.username}
            onChange={inputHandler}
            margin="dense"  
        />
        <TextField
            id="password"
            label="Password"
            type="password"
            value={input.password}
            onChange={inputHandler}
            margin="dense"  
        />
        <TextField
            id="verifyPassword"
            label="Verify Password"
            type="password"
            value={input.verifyPassword}
            onChange={inputHandler}
            margin="dense"
        />               
*/

export default SignUp;
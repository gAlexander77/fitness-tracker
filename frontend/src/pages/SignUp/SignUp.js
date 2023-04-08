import React, { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { CustomTextField1 as TextField } from '../../custom-mui-components/TextField';
import { BsArrowLeft } from "react-icons/bs";
import { apiPath } from '../../config';
import axios from 'axios';
import '../../styles/pages/SignUp/SignUp.css';

const errorStyle = {color: "#cc5500", margin: "10px 0"};

function SignUp(){
    
	const [errorInfo, setErrorInfo] = useState({style: {}, text: ''});
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

		if (input.password !== input.verifyPassword) {
			setErrorInfo({style: errorStyle, text: "Passwords do not match"});
			return;
		}

		axios.post(apiPath("/users/create"), input, {withCredentials: true})
			.then(_res => {
				axios.post(apiPath("/sign-in"), input, {withCredentials: true})
					.finally(() => goToHome());
			})
			.catch(error => {
				if (error.response?.status === 400)
					setErrorInfo({style: errorStyle, text: "User with that name already exists"})
				else
					setErrorInfo({style: errorStyle, text: error.message})
			});
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
                </div>
				<p style={errorInfo.style}>{errorInfo.text}</p>
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

export default SignUp;
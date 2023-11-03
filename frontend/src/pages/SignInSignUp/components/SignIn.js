import React, { useState } from 'react';
import { Form, useNavigate } from 'react-router-dom';
import { BsFillPersonFill, BsKeyFill, BsFillEyeFill, BsFillEyeSlashFill, BsArrowLeft } from 'react-icons/bs';
import '../../../styles/pages/SignInSignUp/components/SignIn.css';
import axios from 'axios';

function SignIn(){
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSignInClick = (event) => {
        event.preventDefault();
        const form = new FormData(event.target);
        axios.post('http://localhost:3001/api/sign-in',
            { username: form.get('username'), password: form.get('password') },
            { withCredentials: true })
            .then(() => navigate('/'))
            .catch(error => setError(error.message));
    };

    const handleSignUpClick = (event) => {
        event.preventDefault();
        navigate('/user#signup');
    };

    const handleReturnHomeClick = (event) => {
        event.preventDefault();
        navigate('/');
    };

    const [visible, setVisible] = useState(false);

    const toggleVisibility = () => {
        setVisible(!visible);
    };

    return(
        <>
            <form className="sign-in-container" method="POST" onSubmit={handleSignInClick}>
                <h1>Sign in to Shape Shift</h1>
                <div className="username-input-container">
                    <BsFillPersonFill id="user-icon"/>
                    <input type="text" placeholder="Username" name="username" />
                </div>
                <div className="password-input-container">
                    <BsKeyFill id="key-icon"/>
                    <input type={visible ? 'text' : 'password'} placeholder="Password" name="password"/>
                    {
                        visible ? 
                        <BsFillEyeSlashFill id="eye-icon" onClick={toggleVisibility} /> : 
                        <BsFillEyeFill id="eye-icon" onClick={toggleVisibility} />
                    }
                </div>
                <div className="buttons-container">
                    <button type="submit" className="sign-in-btn">Sign In</button>
                    <a onClick={handleSignUpClick}>
                        Don't have a account
                    </a>
                </div>
            </form>
            <div className="errors">
                <p>{ error }</p>
            </div>
            <div>
            <a className="sign-in-return-home-btn" onClick={handleReturnHomeClick}>
                <BsArrowLeft id="arrow-icon"/>
                <p>Return home</p>
            </a>
            </div>
        </>
    );
}

export default SignIn;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsFillPersonFill, BsKeyFill, BsFillEyeFill, BsFillEyeSlashFill, BsArrowLeft } from 'react-icons/bs';
import '../../../styles/pages/SignInSignUp/components/SignIn.css';

function SignIn(){
    const navigate = useNavigate();

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
            <form className="sign-in-container">
                <h1>Sign in to Shape Shift</h1>
                <div className="username-input-container">
                    <BsFillPersonFill id="user-icon"/>
                    <input type="text" placeholder="Username"></input>
                </div>
                <div className="password-input-container">
                    <BsKeyFill id="key-icon"/>
                    <input type={visible ? 'text' : 'password'} placeholder="Password"></input>
                    {
                        visible ? 
                        <BsFillEyeSlashFill id="eye-icon" onClick={toggleVisibility} /> : 
                        <BsFillEyeFill id="eye-icon" onClick={toggleVisibility} />
                    }
                </div>
                <div className="buttons-container">
                    <button className="sign-in-btn">Sign In</button>
                    <a onClick={handleSignUpClick}>
                        Don't have a account
                    </a>
                </div>
            </form>
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
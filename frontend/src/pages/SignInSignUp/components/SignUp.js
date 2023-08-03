import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsFillPersonFill, BsKeyFill, BsFillEyeFill, BsFillEyeSlashFill, BsArrowLeft, BsCheckCircle  } from 'react-icons/bs';
import '../../../styles/pages/SignInSignUp/components/SignUp.css';

function SignUp(){
    const navigate = useNavigate();

    const handleSignInClick = (event) => {
        event.preventDefault();
        navigate('/user#signin');
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
            <form className="sign-up-container">
                <h1>Create a Shape Shift account</h1>
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
                <div className="verify-password-input-container">
                    <BsCheckCircle id="verify-icon"/>
                    <input type="password" placeholder="Verify Password"></input>
                </div>
                <div className="buttons-container">
                    <button className="sign-up-btn">Sign In</button>
                    <a onClick={handleSignInClick}>
                        I already have a account
                    </a>
                </div>
            </form>
            <div>
                <a className="sing-up-return-home-btn" onClick={handleReturnHomeClick}>
                    <BsArrowLeft id="arrow-icon"/>
                    <p>Return home</p>
                </a>
            </div>
        </>
    );
}

export default SignUp;
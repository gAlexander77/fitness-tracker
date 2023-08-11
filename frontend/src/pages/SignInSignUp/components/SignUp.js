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


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');

    const [validUsername, setValidUsername] = useState(null);
    const [validPassword, setValidPassword] = useState(null);
    const [validVerifyPassword, setValidVerifyPassword] = useState(null)

    const handleUsernameChange = (e) => {
        const usernameInput = e.target.value;
        setUsername(usernameInput);
        setValidUsername(usernameIsValid(usernameInput));
    };

    const handlePasswordChange = (e) => {
        const passwordInput = e.target.value;
        setPassword(passwordInput);
        setValidPassword(passwordIsValid(passwordInput));
    };

    const handleVerifyPasswordChange = (e) => {
        const verifyPasswordInput = e.target.value;
        setVerifyPassword(verifyPasswordInput);
        setValidVerifyPassword(verifyPasswordIsValid(password,verifyPasswordInput));
    };


    function inputStyle(bool) {
        if (bool === true) {
            return {
                borderColor: 'green',
                boxShadow: '0 0 3px rgba(0, 255, 0, 0.5)'
            };
        } else if (bool === false) {
            return {
                borderColor: 'red',
                boxShadow: '0 0 3px rgba(255, 0, 0, 0.5)'
            };
        } else {
            return null;
        }
    }

    return(
        <>
            <form className="sign-up-container">
                <h1>Create a Shape Shift account</h1>
                <div className="username-input-container">
                    <BsFillPersonFill id="user-icon"/>
                    <input style={inputStyle(validUsername)} type="text" placeholder="Username" value={username} onChange={handleUsernameChange}></input>
                </div>
                <div className="password-input-container">
                    <BsKeyFill id="key-icon"/>
                    <input style={inputStyle(validPassword)} type={visible ? 'text' : 'password'} placeholder="Password" value={password} onChange={handlePasswordChange}></input>
                    {
                        visible ? 
                        <BsFillEyeSlashFill id="eye-icon" onClick={toggleVisibility} /> : 
                        <BsFillEyeFill id="eye-icon" onClick={toggleVisibility} />
                    }
                </div>
                <div className="verify-password-input-container">
                    <BsCheckCircle id="verify-icon"/>
                    <input style={inputStyle(validVerifyPassword)} type="password" placeholder="Verify Password" value={verifyPassword} onChange={handleVerifyPasswordChange}></input>
                </div>
                <div className="buttons-container">
                    <button className="sign-up-btn">Sign Up</button>
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

function usernameIsValid(usernameInput) {
    if (usernameInput==="") {
        return null;
    }

    const restrictedUsernameCharacters = [" ", "!", "@", "#", "$", "%", "^", "&", 
                                          "*", "(", ")", "+", "=", "{", "}", "|",
                                          ":", "<", ">", "?", "/", ".", ",", ";"];
    
    if (usernameInput.length < 4) {
        return false;
    }

    for (const char of restrictedUsernameCharacters) {
        if (usernameInput.includes(char)) {
            return false;
        }
    }

    return true;
}

function passwordIsValid(passwordInput) {
    if(passwordInput === ""){
        return null;
    }
    
    if (passwordInput.length < 7) {
        return false;
    }

    if (passwordInput.includes(" ")) {
        return false;
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(passwordInput)) {
        return false; // No special characters
    }

    if (!/[A-Z]/.test(passwordInput)) {
        return false; // No uppercase letters
    }

    if (!/[a-z]/.test(passwordInput)) {
        return false; // No lowercase letters
    }

    return true;
}

function verifyPasswordIsValid(passwordInput, verifyPasswordInput) {
    if (passwordInput === "" || verifyPasswordInput === "") {
        return null;
    }
    if(passwordInput === verifyPasswordInput){
        return true;
    }
    return false;
}

export default SignUp;
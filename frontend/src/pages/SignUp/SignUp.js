import React, { useState } from 'react';
import { Link } from "react-router-dom";
import TextField from '@mui/material/TextField';

function SignUp(){
    
    const [input, setInput] = useState({
        username: '',
        password: '',
        verifyPassword: ''
    })

    const inputHandler = (evt) => {
        setInput({
            ...input,
            [evt.target.id]: evt.target.value
        });
        console.log(input)
    }

    return(
        <div className="sign-up-page">
            <h1>Sign Up</h1>
            <div className="sign-up-inner">
                <TextField
                    id="username"
                    label="Username"
                    type="text"
                    value={input.username}
                    onChange={inputHandler}
                />
                <TextField
                    id="password"
                    label="Password"
                    type="password"
                    value={input.password}
                    onChange={inputHandler}
                />
                <TextField
                    id="verifyPassword"
                    label="Verify Password"
                    type="password"
                    value={input.verifyPassword}
                    onChange={inputHandler}
                />    
            </div>
            <button>Sign Up</button>
            <Link to="/login">
                <button>Already have an account</button>
            </Link>
        </div>
    );
}

export default SignUp;
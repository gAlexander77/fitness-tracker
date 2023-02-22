import React, {useState} from 'react';
import { Link } from "react-router-dom";
import TextField from '@mui/material/TextField';

function Login(){

    const [input, setInput] = useState({
        username: '',
        password: ''
    })

    const inputHandler = (evt) => {
        setInput({
            ...input,
            [evt.target.id]: evt.target.value
        });
        console.log(input)
    }

    return(
        <div className="login-page">
            <div className="login-inner">
                <h1>Login</h1>
                <div className="login-input-container">
                    <TextField
                        id = 'username'
                        label="Username"
                        type="text"
                        value={input.username}
                        onChange={inputHandler}   
                    />  
                    <TextField
                        id = 'password'
                        label="Password"
                        type="password"
                        value={input.password}
                        onChange={inputHandler}
                    />
                </div>
                <button>Login</button>
                <Link to="/signup">
                    <button>Create a account</button>
                </Link>
            </div>
        </div>
    );
}

export default Login;
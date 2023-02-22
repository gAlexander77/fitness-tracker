import React from 'react';

function HomeWelcome(props){
    
    const NoAccount = () => {
        const message = "message";
        return(
            <>
                <div className="home-welcome-title-no-account">
                    <h1>SHAPE</h1>
                    <h1>SHIFT</h1>
                </div>
                <p className="home-welcome-message">{message}</p>
                <div className="home-welcome-button-container">
                    <button>SIGNUP</button>
                    <button>LOGIN</button>
                </div>
            </>
        );
    };

    const HasAccount = () => {
        return(
            <>
                <div className="home-welcome-title">
                    <h1>SHAPE</h1>
                    <h1>SHIFT</h1>
                </div>
            </>
        );
    };

    return(
        <div className="home-welcome-container">
            {props.isUser ? <HasAccount/> : <NoAccount/>}
        </div>
    );
}

export default HomeWelcome;
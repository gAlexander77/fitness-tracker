import React from 'react';

function HomeAccount(props) {
    return(props.isUser) ? (
        <div className="home-home-account-container">
            MY ACCOUNT
        </div>
    ) : '';
}

export default HomeAccount;
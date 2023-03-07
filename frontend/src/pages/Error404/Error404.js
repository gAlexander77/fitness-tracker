import React from 'react';
import Nav from '../../components/Nav';
import '../../styles/pages/Error404/Error404.css';

function Error404() {
    return(
        <div className="error-404-page">
            <Nav/>
            <div className="error-404-content">
                <h1>Error 404</h1>
                <p>This page does not exist.</p>
            </div>
        </div>
    )
}

export default Error404;
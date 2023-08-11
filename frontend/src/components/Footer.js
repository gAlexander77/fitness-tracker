import React from 'react';
import { BsGithub } from 'react-icons/bs';
import '../styles/components/Footer.css';

function Footer() {
    return(
        <div className="footer">
            <div className="left-container">
                <h1>@2023 SHAPE SHIFT</h1>
            </div>
            <div className="right-container">
                <a><BsGithub/>Source Code</a>
            </div>
        </div>
    );
}

export default Footer;
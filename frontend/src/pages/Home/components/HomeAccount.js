import React from 'react';
import { Link } from "react-router-dom";
import { FaUserCircle } from 'react-icons/fa';
import '../../../styles/pages/Home/Home.css';

function HomeAccount(props) {
    return(props.isUser) ? (
        <div className="home-account-container">
            <Link to='/dashboard'>
                <button>
                    <p>Dashboard</p>
                    <FaUserCircle id="icon"/>
                </button>
            </Link>
        </div>
    ) : '';
}

export default HomeAccount;
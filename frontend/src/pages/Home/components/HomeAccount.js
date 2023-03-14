import React, {useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import '../../../styles/pages/Home/Home.css';

function HomeAccount(props) {

    let navigate = useRef(useNavigate());

    const goToDashboard = () => {
        navigate.current("/dashboard");
    };

    return(props.isUser) ? (
        <div className="home-account-container">
            <button onClick={goToDashboard}>
                <p>Dashboard</p>
                <FaUserCircle id="icon"/>
            </button>
        </div>
    ) : '';
}

export default HomeAccount;
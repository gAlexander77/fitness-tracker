import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import '../styles/components/Nav.css';

function Nav() {
  const navigate = useRef(useNavigate());

  const goToHome = () => {
    navigate.current('/');
  };

  const goToDashboard = () => {
    navigate.current('/dashboard');
  };

  return (
    <nav className="nav">
      <div className="nav-left">
        <button className="nav-logo-link" onClick={goToHome}>
          <h1>SHAPE</h1>
          <h1>SHIFT</h1>
        </button>
        <div className="hamburger-menu" onClick={() => {
          document.querySelector('.hamburger-menu').classList.toggle('active');
          document.querySelector('.menu').classList.toggle('active');
        }}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div className="nav-right">
        <button className="nav-dashboard-link" onClick={goToDashboard}>
          <p>Dashboard</p>
          <FaUserCircle id="icon" />
        </button>
      </div>
      <div className="menu">
        <ul>
          <li>Option 1</li>
          <li>Option 2</li>
          <li>Option 3</li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;

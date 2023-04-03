import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import '../styles/components/Nav.css';

function Nav() {
	return (
		<nav className="nav">
			<div className="nav-left">
				<Home/>
			</div>
			<div className="nav-right">
				<Dashboard/>
				<Menu/>
			</div>
		</nav>
	);
}

function Home() {
	
	const navigate = useRef(useNavigate())

    const goToHome = () => {
	    navigate.current('/');
    };

	return (
		<button className="nav-logo-link" onClick={goToHome}>
            <h1>SHAPE</h1>
            <h1>SHIFT</h1>
        </button>
	);
}

function Dashboard(){
	
	const navigate = useRef(useNavigate())

	const goToDashboard = () => {
        navigate.current('/dashboard');
    };

	return (
		<button className="nav-dashboard-link" onClick={goToDashboard}>
		    <p>Dashboard</p>
		    <FaUserCircle id="icon"/>
	    </button>
	);
}

function Menu() {
	
	function MenuLink(props){
    
		const option = props.option;
		const link = "/"+option.toLowerCase().replace(/\s+/g, "-");
	
		let navigate = useRef(useNavigate());
	
		const goToLink = () => {
			navigate.current(link);
		};
	
		return(
			<li id="link-button" onClick={goToLink}>
				{option}
			</li>
		);
	}
	
	function options(isUser) {
		let menuTitles = [];
		
		if(isUser === true){
			menuTitles = ["My Journal", "My Calendar", "Workouts", "Calculators"];
		}
		else{
			menuTitles = ["WORKOUTS", "CALCULATORS"];
		}
		
		return menuTitles;
	}
	
	return (
		<>
		<div className="hamburger-menu" onClick={() => {
			document.querySelector('.hamburger-menu').classList.toggle('active');
			document.querySelector('.nav-menu').classList.toggle('active');
		}}>
		    <span></span>
			<span></span>
			<span></span>
	    </div>
        <div className="nav-menu">
            <ul>
				{options(true).map((option, index)=> {
					return(
						<MenuLink
							key={index}
							option={option}
						/>
					);
				})}
            </ul>
		</div>
		</>
	);
}

export default Nav;

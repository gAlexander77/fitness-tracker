import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { BsPencilSquare, BsCalendarFill, BsCalculatorFill } from 'react-icons/bs';
import { MdDirectionsRun } from 'react-icons/md';
import '../styles/components/Nav.css';

function Nav({isUserSignedIn}) {

	const [isUser, setIsUser] = useState(true);

	useEffect(() => {
		if(isUserSignedIn===false) {
			setIsUser(false);
		}
		else if(isUserSignedIn===true) {
			setIsUser(true);
		}
	},[isUserSignedIn])

	return (
		<nav className="nav">
			<div className="nav-left">
				<Home/>
			</div>
			<div className="nav-right">
				{isUser ? <Dashboard/> : <LoginOptions/>}
				<Menu isUser={isUser}/>
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

function LoginOptions(){
	const navigate = useRef(useNavigate())

	const goToLogin = () => {
        navigate.current('/user#signin');
    };

	const goToSignup = () => {
		navigate.current('/user#signup');
	}

	return (
		<div className="nav-login-options-container">
			<button className="nav-login-btn" onClick={goToLogin}>Log In</button>
			<button className="nav-signup-btn" onClick={goToSignup}>Sign Up</button>
		</div>
	);
}

function Menu({isUser}) {
	
	function MenuLink(props){
    
		const option = props.option;
		const link = "/"+option.toLowerCase().replace(/\s+/g, "-");
	
		let navigate = useRef(useNavigate());
	
		const goToLink = () => {
			navigate.current(link);
		};
	
		return(
			<li id="link-button" onClick={goToLink}>
				<RenderIcon option={option}/>
				<p>{option}</p>
			</li>
		);

		function RenderIcon({option}){
			switch (option) {
				case 'My Journal':
					return <BsPencilSquare/>;
				case 'My Calendar':
					return <BsCalendarFill/>;
				case 'Workouts':
					return <MdDirectionsRun/>
				case 'Calculators':
					return <BsCalculatorFill/>
				default:
					return <>test</>;
			}
		}
	}
	
	function options(isUser) {
		let menuTitles = [];
		
		if(isUser === true){
			menuTitles = ["My Journal", "My Calendar", "Workouts", "Calculators"];
		}
		else{
			menuTitles = ["Workouts", "Calculators"];
		}
		
		return menuTitles;
	}
	
	const menuRef = useRef();
	const hamburgerRef = useRef();
  
	const toggleMenu = () => {
		hamburgerRef.current.classList.toggle('active');
		menuRef.current.classList.toggle('active');
	};
  
	const handleClickOutside = (event) => {
		if (menuRef.current && !menuRef.current.contains(event.target) && !hamburgerRef.current.contains(event.target)) {
			hamburgerRef.current.classList.remove('active');
			menuRef.current.classList.remove('active');
		}
	};
  
	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);
    
	return (
		<>
		<div className="hamburger-menu" ref={hamburgerRef} onClick={toggleMenu}>
			<span></span>
		  	<span></span>
		  	<span></span>
		</div>
		<div className="nav-menu" ref={menuRef}>
		  	<ul>
				{options(isUser).map((option, index) => {
			  		return <MenuLink key={index} option={option} />;
				})}
		  	</ul>
		</div>
	  </>
	);
}

export default Nav;

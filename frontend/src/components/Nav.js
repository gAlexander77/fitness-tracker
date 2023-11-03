import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { BsPencilSquare, BsCalendarFill, BsCalculatorFill } from 'react-icons/bs';
import { MdDirectionsRun } from 'react-icons/md';
import '../styles/components/Nav.css';
import axios from 'axios';

function Nav() {

	const [user, setUser] = useState(undefined);
	const [menuIsOpen, setMenuIsOpen] = useState(false);

	useEffect(() => {
		if (user === undefined) {
			axios.get('http://localhost:3001/api/', {withCredentials: true})
				.then(response => setUser(response.data))
				.catch(() => setUser(null));
		}
	}, [user]);

	const [isNavbarShrunk, setIsNavbarShrunk] = useState(false);
	const navRef = useRef(null);

	const handleScroll = () => {
		if (window.scrollY === 0) {
			setIsNavbarShrunk(false);
		} else {
			setIsNavbarShrunk(true);
		}
	};

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const navClass = isNavbarShrunk ? 'nav shrunk' : 'nav';
	/*const navClass = isNavbarShrunk ? 'nav' : 'nav';*/

	let menu;
	if (user === undefined) {
		menu = <LoginOptions />;
	} else {
		menu = <Dashboard />;
	}

	return (
		<nav className={navClass} ref={navRef} id="navbar">
			<div className="nav-left">
				<Home/>
			</div>
			<div className="nav-right">
				{ menu }
				<Menu user={user}/>
			</div>
		</nav>
	);
}

function Home() {
	
	const navigate = useRef(useNavigate());

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

function Menu({user}) {
	
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
				{options(!!user).map((option, index) => {
			  		return <MenuLink key={index} option={option} />;
				})}
		  	</ul>
		</div>
	  </>
	);
}

export default Nav;

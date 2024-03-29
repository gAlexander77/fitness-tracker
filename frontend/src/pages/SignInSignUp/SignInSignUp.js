import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { BsArrowLeft } from 'react-icons/bs';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import video from '../../assets/SignInSignUpBackgroundVideo.mp4';
import '../../styles/pages/SignInSignUp/SignInSignUp.css';

function SignInSignUp() {
    const videoRef = React.useRef(null);

    React.useEffect(() => {
      if (videoRef.current) {
        videoRef.current.playbackRate = 0.3;
      }
    }, []);

    return(
        <div className="SignInSignUp-page">
            <video id="video" ref={videoRef} src={video} autoPlay loop muted/>
            <div className="video-overlay"/>
            <div className="SignInSignUp-inner">
                <div className="header-container">
                    <div className="header">
                        <h1>Shape</h1>
                        <h1>Shift</h1>
                    </div>
                </div>
                <div className="content-container">
                    <RenderComponent/>
                </div>
            </div>
        </div>
    );
}

function RenderComponent() {
    const location = useLocation();
    const hash = location.hash;
  
    switch(hash.toLowerCase()) {
      case '#signin':
        return <SignIn/>;
      case '#signup':
        return <SignUp/>;
      default:
        return <DefaultRender/>;
    }
  }

function DefaultRender(){
    const navigate = useNavigate();

    const handleSignInClick = (event) => {
        event.preventDefault();
        navigate('/user#signin');
    };

    const handleSignUpClick = (event) => {
        event.preventDefault();
        navigate('/user#signup');
    };

    const handleReturnHomeClick = (event) => {
        event.preventDefault();
        navigate('/');
    };

    return(
        <>
            <div className="default-render-container">
                <div className="button-container">
                    <button onClick={handleSignInClick}>Sign In</button>
                    <button onClick={handleSignUpClick}>Sign Up</button>
                </div>
                <a className="default-return-home-btn" onClick={handleReturnHomeClick}>
                    <BsArrowLeft id="arrow-icon"/>
                    <p>Return home</p>
                </a>
            </div>
        </>
    );
}

export default SignInSignUp;
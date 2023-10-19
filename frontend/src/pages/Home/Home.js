import React, {useState} from 'react';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import HomeWelcome from './components/HomeWelcome';
import HomeMenuOptions from './components/HomeMenuOptions';
import HomeAccount from './components/HomeAccount';
import '../../styles/pages/Home/Home.css';

function Home(){
    const [isUser, setIsUser] = useState(true);
    return(
        <>
            <Nav isUserSignedIn={isUser}/>
            <div className="home-page">
                <div className="home-body-container">
                    <HomeWelcome isUser={isUser}/>
                    <HomeMenuOptions isUser={isUser}/>
                    <TestButton isUser={isUser} setIsUser={setIsUser}/>
                </div>
            </div>
            <Footer/>
        </>
    );
}

function TestButton(props) {
    return(
        <button 
            onClick={() => props.setIsUser(!props.isUser)}
            style={{
                all: 'unset',
                backgroundColor: 'transparent',
                width: '100px',
                height: '100px',
                position: 'absolute',
                bottom: 0,
                right: 0,
            }}
        />
    );
}

export default Home;
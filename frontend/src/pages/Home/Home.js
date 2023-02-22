import React from 'react';
import HomeWelcome from './components/HomeWelcome';
import HomeMenuOptions from './components/HomeMenuOptions';
import HomeAccount from './components/HomeAccount';

function Home(){
    const isUser = true;
    return(
        <div className="home-page">
            <HomeAccount isUser={isUser}/>
            <div className="home-body-container">
                <HomeWelcome isUser={isUser}/>
                <HomeMenuOptions isUser={isUser}/>
            </div>
        </div>
    );
}

export default Home;
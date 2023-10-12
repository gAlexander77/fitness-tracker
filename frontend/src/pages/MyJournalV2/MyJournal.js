import React, { useState } from 'react';
import { BsGraphUp, BsFillJournalBookmarkFill } from 'react-icons/bs';
import Nav from '../../components/Nav'
import Background from '../../components/Background';
import Footer from '../../components/Footer';
import Journal from './components/Journal';
import '../../styles/pages/MyJournalV2/MyJournal.css';


function MyJournal() {
    const [viewJournal, setViewJournal] = useState(true); 

    return (
        <>
            <Nav/>
            <div className="my-journal-page">
                <div className="my-journal-content">
                    <div className="my-journal-dashboard">
                        <div className="header">
                            <h1 className="title">My Journal</h1>
                            <HeaderToggle 
                                viewJournal={viewJournal}
                                setViewJournal={setViewJournal}
                            />
                        </div>
                        <div className="content">
                            {viewJournal ? <Journal/> : "data"}
                        </div>
                    </div>
                </div>
                <Background/>
            </div>
            <Footer/>
        </>
    );
}

function HeaderToggle({viewJournal, setViewJournal}) {
    
    const toggle = () => {
        setViewJournal(!viewJournal);
    }
    
    return viewJournal ? 
    <BsGraphUp onClick={toggle} className="journal-toggle-btn"/>
    : 
    <BsFillJournalBookmarkFill onClick={toggle} className="journal-toggle-btn"/>
}


export default MyJournal;
import React, { useState, useEffect } from "react";
import { BsGraphUp, BsFillJournalBookmarkFill } from "react-icons/bs";
import Nav from "../../components/Nav";
import Background from "../../components/Background";
import Footer from "../../components/Footer";
import Journal from "./components/Journal";
import Graphs from "./components/JournalData";
import "../../styles/pages/MyJournalV2/MyJournal.css";
import axios from 'axios';

// Test Data
import { useNavigate } from "react-router-dom";

function MyJournal() {
    const [journalEntries, setJournalEntries] = useState([]);
    const [reload, setReload] = useState(true);
    const navigate = useNavigate();

    // Reload Function to pass to other components
    const reloadJournal = () => setReload(true);

    useEffect(() => {
        if (reload) {
            axios.get(`${process.env.REACT_APP_API_URL}/journal`, {withCredentials: true})
                .then(response => setJournalEntries(response.data))
                .catch(() => navigate('/'));
            setReload(false);
        }
    }, [reload, navigate]);

    const [viewJournal, setViewJournal] = useState(true);

    return (
        <>
            <Nav />
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
                            {viewJournal ? (
                                <Journal
                                    journalEntries={journalEntries}
                                    reloadJournal={reloadJournal}
                                />
                            ) : (
                                <Graphs journalEntries={journalEntries} />
                            )}
                        </div>
                    </div>
                </div>
                <Background />
            </div>
            <Footer />
        </>
    );
}

function HeaderToggle({ viewJournal, setViewJournal }) {
    const toggle = () => {
        setViewJournal(!viewJournal);
    };

    return viewJournal ? (
        <BsGraphUp onClick={toggle} className="journal-toggle-btn" />
    ) : (
        <BsFillJournalBookmarkFill
            onClick={toggle}
            className="journal-toggle-btn"
        />
    );
}

export default MyJournal;

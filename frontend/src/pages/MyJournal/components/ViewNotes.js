import React, { useState, useEffect } from 'react';
import { BsXLg } from 'react-icons/bs';
import '../../../styles/pages/MyJournal/components/ViewNotes.css';

function ViewNotes(props) {
    
    const [showNotePopup, setShowNotePopup] = useState(false);
    const [selectedNoteTitle, setSelectedNoteTitle] = useState("");
    const [selectedNoteContent, setSelectedNoteContent] = useState("");
    const [notesArray, setNotesArray] = useState([]);

    useEffect(() => {
        for (let entry of props.journalData) {
          if (entry.journalEntry === props.selectedEntry) {
            setNotesArray(entry.notes);
            break;
          }
        }
    }, [props.selectedEntry]);


    console.log(props.journalData)
    console.log(props.selectedEntry)
    console.log(notesArray);

    return(
        <div className="view-notes-component">
            {notesArray.map((note, index)=>{
                return(
                    <IndividualNote
                        key={index}
                        note={note}
                        noteTitle={note.title}
                        noteContent={note.note}

                        setShowNotePopup={setShowNotePopup}
                        setSelectedNoteTitle={setSelectedNoteTitle}
                        setSelectedNoteContent={setSelectedNoteContent}
                    />
                );
            })}
            <NotePopup 
                trigger={showNotePopup} 
                setTigger={setShowNotePopup}
                noteTitle={selectedNoteTitle} 
                noteContent={selectedNoteContent}
            />
        </div>
    );
}

function IndividualNote(props) {
    
    const viewNoteHandler = () => {
        props.setSelectedNoteTitle(props.noteTitle);
        props.setSelectedNoteContent(props.noteContent);
        props.setShowNotePopup(true);
    }

    return(
        <button onClick={viewNoteHandler}>{props.noteTitle}</button>
    );
}

function NotePopup(props) {
    
    const exitPopupHandler = () => {
        props.setTigger(false);
    }

    return(props.trigger)?(
        <div className="view-note-note-popup-outer" id="outer">
            <div className="view-note-note-popup-inner" id="inner">
                <button id="exit-btn" onClick={exitPopupHandler}>
                    <BsXLg/>
                </button>
                <h1>{props.noteTitle}</h1>
                <p>{props.noteContent}</p>
            </div>
        </div>
    ):'';
}

export default ViewNotes;
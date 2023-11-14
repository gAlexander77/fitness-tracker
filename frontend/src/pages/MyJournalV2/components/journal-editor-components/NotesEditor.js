import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import "../../../../styles/pages/MyJournalV2/components/journal-editor-components/NotesEditor.css";
import axios from 'axios';

function NotesEditor({ notesData, reloadJournal }) {
    const [editor, setEditor] = useState(false);

    const toggleEditor = () => {
        setEditor(!editor);
    };

    return (
        <div className="notes-editor-component">
            {editor ? (
                <h1 id="notes-editor-title">Add Note</h1>
            ) : (
                <h1 id="notes-editor-title">Notes</h1>
            )}
            {editor ? null : (
                <>
                    <DisplayNotes notesData={notesData} />
                    <AddNoteButton
                        toggleEditor={toggleEditor}
                        editor={editor}
                    />
                </>
            )}
            <AddNoteEditor
                toggleEditor={toggleEditor}
                editor={editor}
                reloadJournal={reloadJournal}
            />
        </div>
    );
}

function DisplayNotes({ notesData }) {
    return (
        <div className="display-notes">
            {notesData.map((note, index) => (
                <Note
                    key={index}
                    title={note.title}
                    note={note.note}
                    numOfNotes={notesData.length}
                    index={index}
                />
            ))}
        </div>
    );
}

function Note({ title, note, numOfNotes, index }) {
    return (
        <div className="individual-note">
            <h1 id="note-title">{title}</h1>
            <p id="note">{note}</p>
        </div>
    );
}

export default NotesEditor;

function AddNoteButton({ toggleEditor, editor }) {
    return editor ? null : (
        <div className="add-note-btn-container">
            <button className="add-note-btn" onClick={toggleEditor}>
                Add Note
            </button>
        </div>
    );
}

function AddNoteEditor({ toggleEditor, editor, reloadJournal }) {
    const defaultNote = {
        title: "",
        note: "",
    };

    const [note, setNote] = useState(defaultNote);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNote({ ...note, [name]: value });
    };

    const goBack = () => {
        toggleEditor();
    };

    const saveNote = () => {
        axios.post(`${process.env.REACT_APP_API_URL}/journal/note`, { note }, {withCredentials: true})
            .then(() => {
                reloadJournal();
                toggleEditor();
            })
            .catch(() => navigate('/'))        
    };

    return editor ? (
        <div className="add-note-component">
            <button className="go-back-btn" onClick={goBack}>
                <BsArrowLeft />
            </button>
            <div className="input-container">
                <input
                    name="title"
                    placeholder="Title of Note"
                    value={note.title}
                    onChange={handleChange}
                />
                <textarea
                    name="note"
                    placeholder="Write your note here."
                    value={note.note}
                    onChange={handleChange}
                />
            </div>
            <div className="button-container">
                <button onClick={saveNote}>Save Note</button>
            </div>
        </div>
    ) : null;
}

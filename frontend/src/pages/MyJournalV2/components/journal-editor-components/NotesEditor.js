import React, { useState } from "react";
import "../../../../styles/pages/MyJournalV2/components/journal-view-components/ViewNotes.css";

import "../../../../styles/pages/MyJournalV2/components/journal-editor-components/NotesEditor.css";

function NotesEditor({ notesData }) {
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
            <AddNotes toggleEditor={toggleEditor} editor={editor} />
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

function AddNotes({ toggleEditor, editor }) {
    const saveNote = () => {
        toggleEditor();
    };

    return editor ? (
        <div className="add-note-component">
            <div className="input-container">
                <h1>Note Title</h1>
                <input></input>
            </div>
            <div className="text-area-container">
                <textarea></textarea>
            </div>
            <div className="button-container">
                <button onClick={saveNote}>Save Note</button>
            </div>
        </div>
    ) : null;
}

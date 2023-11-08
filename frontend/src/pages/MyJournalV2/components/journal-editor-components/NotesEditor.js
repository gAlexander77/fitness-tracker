import React, { useState } from "react";
import "../../../../styles/pages/MyJournalV2/components/journal-view-components/ViewNotes.css";

import "../../../../styles/pages/MyJournalV2/components/journal-editor-components/NotesEditor.css";

function ViewNotes({ notesData }) {
    const [editor, setEditor] = useState(false);

    const toggleEditor = () => {
        setEditor(!editor);
    };

    return (
        <div className="view-notes-component">
            <h1 id="view-notes-title">Notes</h1>
            <DisplayNotes notesData={notesData} />
            <AddNotesButton toggleEditor={toggleEditor} editor={editor} />
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

export default ViewNotes;

function AddNotesButton({ toggleEditor, editor }) {
    return editor ? null : (
        <div>
            <button onClick={toggleEditor}>Add Note</button>
        </div>
    );
}

function AddNotes({ toggleEditor, editor }) {
    const saveNote = () => {
        toggleEditor();
    };

    return editor ? (
        <div>
            <h1>Add Note</h1>
            <div>
                <h1>Note Title</h1>
                <input></input>
            </div>
            <div>
                <textarea></textarea>
            </div>
            <div>
                <button onClick={saveNote}>Save Note</button>
            </div>
        </div>
    ) : null;
}

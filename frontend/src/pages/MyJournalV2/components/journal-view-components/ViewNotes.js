import React from "react";
import "../../../../styles/pages/MyJournalV2/components/journal-view-components/ViewNotes.css";

function ViewNotes({ notesData }) {
    return (
        <div className="view-notes-component">
            <h1 id="view-notes-title">Notes</h1>
            <DisplayNotes notesData={notesData} />
        </div>
    );
}

function DisplayNotes({ notesData }) {
    return (
        <div className="display-notes">
            {notesData.map((note, index) => (
                <Note
                    key={index}
                    title={note?.title}
                    note={note?.note}
                    numOfNotes={notesData.length}
                    index={index}
                />
            ))}
        </div>
    );
}

function Note({ title, note, numOfNotes, index }) {

    const className =
        index + 1 === numOfNotes
            ? "individual-note bottom-and-top-border"
            : "individual-note";

    return (
        <div className={className}>
            <h1 id="note-title">{title}</h1>
            <p id="note">{note}</p>
        </div>
    );
}

export default ViewNotes;

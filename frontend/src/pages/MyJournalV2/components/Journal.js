import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JournalEditor from "./JournalEditor";
import JournalView from "./JournalView";

import "../../../styles/pages/MyJournalV2/components/Journal.css";

export default function Journal({ journalEntries, reloadJournal }) {
    const params = useParams();
    const dateFromUrl = params.dateFromUrl;

    console.log(dateFromUrl);
    const currentDate = formatDateToMDYYYY(new Date());
    const [selectedEntry, setSelectedEntry] = useState(
        dateFromUrl ? dateFromUrl : currentDate
    );
    const datesOfEntries = arrayOfJournalEntryDates(
        journalEntries,
        currentDate
    );

    const defaultJournalEntry = {
        journalEntry: currentDate,
        mesurments: [],
        personalRecords: [],
        calculatorResults: [],
        macros: [],
        notes: [],
    };

    const [selectedEntryData, setSelectedEntryData] = useState();
    useEffect(() => {
        const entry = journalEntries.find(
            (entry) => entry.journalEntry === selectedEntry
        );
        if (!entry) {
            setSelectedEntryData(defaultJournalEntry);
        } else {
            setSelectedEntryData(entry);
        }
    }, [selectedEntry, journalEntries]);

    return (
        <div className="view-journal-entries-dashboard">
            <SelectJournalEntry
                datesOfEntries={datesOfEntries}
                currentDate={currentDate}
                setSelectedEntry={setSelectedEntry}
                selectedEntry={selectedEntry}
            />
            <div className="view-journal-entry-display">
                {selectedEntry === currentDate ? (
                    <JournalEditor
                        journalEntry={selectedEntryData}
                        reloadJournal={reloadJournal}
                    />
                ) : (
                    <JournalView
                        currentDate={currentDate}
                        journalEntry={selectedEntryData}
                    />
                )}
            </div>
        </div>
    );
}

// Renders a list of journal entry dates to select
function SelectJournalEntry({
    currentDate,
    datesOfEntries,
    setSelectedEntry,
    selectedEntry,
}) {
    // Filtering out the current date from datesOfEntries
    const filteredDates = datesOfEntries.filter((date) => date !== currentDate);

    return (
        <div className="select-journal-entry-container">
            <DayButton
                date={currentDate}
                setSelectedEntry={setSelectedEntry}
                selectedEntry={selectedEntry}
            />
            {filteredDates.map((data) => (
                <DayButton
                    key={data}
                    date={data}
                    setSelectedEntry={setSelectedEntry}
                    selectedEntry={selectedEntry}
                />
            ))}
        </div>
    );
}

function DayButton({ date, setSelectedEntry, selectedEntry }) {
    const selectEntry = () => {
        setSelectedEntry(date);
        console.log(date);
    };

    const buttonStyle = {
        backgroundColor: date === selectedEntry ? "#2DEDF3" : "",
        color: date === selectedEntry ? "black" : "",
        pointerEvents: date === selectedEntry ? "none" : "",
    };

    return (
        <button
            className="select-entry-btn"
            style={buttonStyle}
            onClick={selectEntry}
        >
            {formatView(date)}
        </button>
    );
}

// UTILITES

// Formats the date to mm-dd-yyyy
function formatDateToMDYYYY(dateInput) {
    const date = new Date(dateInput);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();

    return `${month}-${day}-${year}`;
}

// Gets array of only date of journal entries from journalEntries in order from most recent to least recent
function arrayOfJournalEntryDates(journalEntries, currentDate) {
    const journalEntriesArray =
        journalEntries?.map((item) => item.journalEntry) || [];
    const filteredEntries = journalEntriesArray.filter(
        (entry) => entry.date !== currentDate
    );
    const reversedEntries = [...filteredEntries].reverse();
    return reversedEntries;
}

// Converts the date view
// Example: "1-1-2023" -> "01-01-2023"
// USE FOR DISPLAY ONLY
function formatView(dateString) {
    const [month, day, year] = dateString.split("-");

    const paddedMonth = month.length === 1 ? "0" + month : month;
    const paddedDay = day.length === 1 ? "0" + day : day;

    return `${paddedMonth}-${paddedDay}-${year}`;
}

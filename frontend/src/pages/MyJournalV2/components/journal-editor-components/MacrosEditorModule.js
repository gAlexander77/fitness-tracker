import React, { useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import "../../../../styles/pages/MyJournalV2/components/journal-editor-components/MacrosEditorModule.css";
import axios from 'axios';

function MacrosEditorModule({ goBack, reloadJournal }) {
    return (
        <div className="macros-editor-module-component">
            <h1 id="title">Enter the macros of your meal</h1>
            <div className="macros-editor-module-content">
                <button className="go-back-btn" onClick={goBack}>
                    <BsArrowLeft />
                </button>
                <MacroEntries reloadJournal={reloadJournal} goBack={goBack} />
            </div>
        </div>
    );
}

function MacroEntries({ reloadJournal, goBack }) {
    const defaultEntry = {
        type: "",
        amount: "",
        unit: "grams",
    };

    const [entries, setEntries] = useState([defaultEntry]);
    const [calorieAmount, setCalorieAmount] = useState(0);
    const navigate = useNavigate();

    const handleCalorieChange = (event) => {
        setCalorieAmount(event.target.value);
    };

    const addEntry = () => {
        setEntries([...entries, { ...defaultEntry }]);
    };

    const removeEntry = (indexToRemove) => {
        setEntries(entries.filter((_, index) => index !== indexToRemove));
    };

    const updateEntryField = (index, field, value) => {
        const updatedEntries = [...entries];
        updatedEntries[index][field] = value;
        setEntries(updatedEntries);
    };

    // POST REQUEST HERE
    const addMacrosEntryToJournal = () => {
        entries.unshift({ type: 'calories', amount: calorieAmount, unit: 'KCal' });

        axios.post(`${process.env.REACT_APP_API_URL}/journal/macro`, { macros: entries.slice(0, -1) }, {withCredentials: true})
            .then(() => {
                reloadJournal();
                goBack();
            })
            .catch(() => navigate('/'));        
    };

    return (
        <>
        <div className="total-calories-container">
            <h1 id="title">Total Calories</h1>
            <div className="input-container">
                <input placeholder="ex 1000" type="text" onChange={handleCalorieChange}></input>
                <h1 id="unit">kCal</h1>
            </div>
        </div>
        <div className="macros-entries-container">
            <div className="macros-editor">
                {entries.map((entry, index) => (
                    <MacroEntry
                        index={index}
                        type={entry.type}
                        amount={entry.amount}
                        unit={entry.unit}
                        removeEntry={() => removeEntry(index)}
                        updateEntryField={updateEntryField}
                        numOfEntries={entries.length}
                    />
                ))}
                <button onClick={addEntry} className="add-macro-entry-btn">
                    Add Macro Entry
                </button>
            </div>
            <button
                className="add-macro-entry-to-journal-btn"
                onClick={addMacrosEntryToJournal}
            >
                Add Macro Entry to Journal
            </button>
        </div>
        </>
    );
}

function MacroEntry({
    index,
    type,
    amount,
    unit,
    removeEntry,
    updateEntryField,
    numOfEntries,
}) {
    const handleTypeChange = (event) => {
        updateEntryField(index, "type", event.target.value);
    };

    const handleAmountChange = (event) => {
        updateEntryField(index, "amount", event.target.value);
    };

    const handleUnitChange = (event) => {
        updateEntryField(index, "unit", event.target.value);
    };

    return (
        <div className="individual-macro-entry-editor">
            <div className="input-container">
                <h1>Type</h1>
                <input
                    value={type}
                    onChange={handleTypeChange}
                    placeholder="ex Protein"
                ></input>
            </div>
            <div className="input-container">
                <h1>Amount</h1>
                <input value={amount} onChange={handleAmountChange}></input>
            </div>
            <div className="input-container">
                <h1>Unit</h1>
                <input
                    value={unit}
                    onChange={handleUnitChange}
                    placeholder="ex grams"
                ></input>
            </div>
            {index === 0 && numOfEntries === 1 ? (
                <></>
            ) : (
                <button className="remove-btn" onClick={removeEntry}>
                    Remove
                </button>
            )}
        </div>
    );
}

export default MacrosEditorModule;

import React, { useState, useEffect } from "react";
import ViewMacrosBarChart from "../journal-view-components/ViewMacrosBarChart";
import MacrosEditorModule from "./MacrosEditorModule";
import "../../../../styles/pages/MyJournalV2/components/journal-editor-components/MacrosEditor.css";

function MacrosEditor({ currentDate, macrosData, reloadJournal }) {
    const [openEditor, setOpenEditor] = useState(false);

    const [caloriesData, setCaloriesData] = useState(null);
    const [otherMacrosData, setOtherMacrosData] = useState(null);

    useEffect(() => {
        if (macrosData) {
            const caloriesObject = macrosData.find(
                (macro) => macro.type === "calories"
            );
            setCaloriesData(caloriesObject ? caloriesObject : null);
        }
    }, [macrosData]);

    useEffect(() => {
        if (macrosData) {
            const macrosObjectArray = macrosData.filter(
                (macro) => macro.type !== "calories"
            );
            setOtherMacrosData(macrosObjectArray ? macrosObjectArray : null);
        }
    }, [macrosData]);

    const goBack = () => {
        setOpenEditor(false);
    };

    console.log(macrosData);
    return openEditor ? (
        <MacrosEditorModule goBack={goBack} reloadJournal={reloadJournal} />
    ) : (
        <div className="macros-editor-component">
            <h1 id="macros-title">Macros</h1>
            <CaloriesDisplay caloriesData={caloriesData} />
            <DisplayMacros otherMacrosData={otherMacrosData} />
            <ViewMacrosBarChart macrosData={otherMacrosData} />
            {macrosData === null || macrosData.length === 0 ? (
                <div className="no-data">
                    <h1>No Macro Data Recorded</h1>
                </div>
            ) : (
                <></>
            )}
            <AddMealButton setOpenEditor={setOpenEditor} />
        </div>
    );
}

function CaloriesDisplay({ caloriesData }) {
    return caloriesData ? (
        <div className="calories-display">
            <p id="title">Total Calories</p>
            <p id="amount">{caloriesData.amount} kCal</p>
        </div>
    ) : null;
}

function DisplayMacros({ otherMacrosData }) {
    return otherMacrosData ? (
        <div className="macros-display-container">
            {otherMacrosData.map((macro, index) => (
                <div key={index} className="individual-macro">
                    <p id="title">{macro.type}</p>
                    <p id="ammount">
                        {macro.amount} {macro.unit}
                    </p>
                </div>
            ))}
        </div>
    ) : null;
}

export default MacrosEditor;

// EDITOR POPUP
function AddMealButton({ setOpenEditor }) {
    const openEditor = () => {
        setOpenEditor(true);
    };

    return (
        <div className="add-meal-button-container">
            <button onClick={openEditor}>Add Meal</button>
        </div>
    );
}

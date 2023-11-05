import React, { useState, useEffect } from 'react';
import ViewMacrosBarChart from '../journal-view-components/ViewMacrosBarChart';
import '../../../../styles/pages/MyJournalV2/components/journal-view-components/ViewMacros.css';

import '../../../../styles/pages/MyJournalV2/components/journal-editor-components/MacrosEditor.css';

function MacrosEditor({currentDate, macrosData}) {
    const [caloriesData, setCaloriesData] = useState(null);
    const [otherMacrosData, setOtherMacrosData] = useState(null);

    useEffect(() => {
        if(macrosData){
            const caloriesObject = macrosData.find(macro => macro.type === "calories");
            setCaloriesData(caloriesObject ? caloriesObject : null);
        }
    },[macrosData]);

    useEffect(() => {
        if(macrosData){
            const macrosObjectArray = macrosData.filter(macro => macro.type !== "calories");
            setOtherMacrosData(macrosObjectArray ? macrosObjectArray : null);
        }
    },[macrosData]);

    return (
        <div className="view-macros-component">
            <h1 id="macros-title">Macros</h1>
            <CaloriesDisplay
                caloriesData={caloriesData}
            />
            <DisplayMacros
                otherMacrosData={otherMacrosData}
            />
            <ViewMacrosBarChart macrosData={otherMacrosData}/>
            <AddMealButton/>
        </div>
    );
}

function CaloriesDisplay({caloriesData}) {
    return caloriesData ? (
        <div className="calories-display">
            <p id="title">Total Calories</p>
            <p id="amount">{caloriesData.amount} kCal</p>
        </div>
    ): null;
}

function DisplayMacros({otherMacrosData}) {
    return otherMacrosData ? (
        <div className="macros-display-container">
            {otherMacrosData.map((macro, index) => (
                <div key={index} className="individual-macro">
                    <p id="title">{macro.type}</p>
                    <p id="ammount">{macro.amount} {macro.unit}</p>
                </div>
            ))}
        </div>
    ): null;
}

export default MacrosEditor;

// EDITOR POPUP
function AddMealButton() {
    return (
        <div className="add-meal-button-container">
            <button>
                Add Meal
            </button>
        </div>
    );
}
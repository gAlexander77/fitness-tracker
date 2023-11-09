import React, { useState, useEffect } from "react";
import ViewMacrosBarChart from "./ViewMacrosBarChart";
import "../../../../styles/pages/MyJournalV2/components/journal-view-components/ViewMacros.css";

function ViewMacros({ currentDate, macrosData }) {
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

    return (
        <div className="view-macros-component">
            <h1 id="macros-title">Macros</h1>
            <CaloriesDisplay caloriesData={caloriesData} />
            <DisplayMacros otherMacrosData={otherMacrosData} />
            <ViewMacrosBarChart macrosData={otherMacrosData} />
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

export default ViewMacros;

import React, { useState, useEffect } from "react";
import MacrosEditor from "./journal-editor-components/MacrosEditor";
import CalculatorResultEditor from "./journal-editor-components/CalculatorResultsEditor";

function JournalEditor({ currentDate, journalEntry, reloadJournal }) {
    //console.log(journalEntry)

    const [selectedCategory, setSelectedCategory] = useState("Macros");

    const [selectedCategoryData, setSelectedCategoryData] = useState(null);

    useEffect(() => {
        if (journalEntry && journalEntry[categoryKey(selectedCategory)]) {
            setSelectedCategoryData(
                journalEntry[categoryKey(selectedCategory)]
                    ? journalEntry[categoryKey(selectedCategory)]
                    : null
            );
        }
    }, [selectedCategory, journalEntry]);

    //console.log(journalEntry);
    //console.log(selectedCategoryData)

    return (
        <div className="journal-view">
            <JournalViewSelector
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
            />
            {selectedCategory === "Macros" ? (
                <MacrosEditor
                    currentDate={currentDate}
                    macrosData={selectedCategoryData}
                    reloadJournal={reloadJournal}
                />
            ) : null}
            {selectedCategory === "Calculator Results" ? (
                <CalculatorResultEditor
                    currentDate={currentDate}
                    calculatorResultsData={selectedCategoryData}
                    reloadJournal={reloadJournal}
                />
            ) : null}
        </div>
    );
}

function JournalViewSelector({ selectedCategory, setSelectedCategory }) {
    const categories = [
        "Macros",
        "Measurements",
        "Personal Records",
        "Calculator Results",
        "Notes",
    ];

    return (
        <div className="journal-view-selector">
            {categories.map((category) => (
                <CategoryButton
                    key={category}
                    category={category}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                />
            ))}
        </div>
    );
}

function CategoryButton({ category, selectedCategory, setSelectedCategory }) {
    const selectCategory = () => {
        setSelectedCategory(category);
    };

    const buttonStyle = {
        backgroundColor: selectedCategory === category ? "#2DEDF3" : "#414141",
        color: selectedCategory === category ? "black" : "white",
    };

    return (
        <button
            className="category-btn"
            style={buttonStyle}
            onClick={selectCategory}
        >
            {category}
        </button>
    );
}

function categoryKey(category) {
    const categoryMap = {
        Macros: "macros",
        Measurements: "measurements",
        "Personal Records": "personalRecords",
        "Calculator Results": "calculatorResults",
        Notes: "notes",
    };
    return categoryMap[category];
}

export default JournalEditor;

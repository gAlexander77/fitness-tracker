import React, { useState, useEffect } from 'react';
import ViewMacros from './journal-view-components/ViewMacros';
import ViewMeasurements from './journal-view-components/ViewMeasurements';
import ViewPersonalRecords from './journal-view-components/ViewPersonalRecords';
import ViewCalculatorResults from './journal-view-components/ViewCalculatorResults';
import ViewNotes from './journal-view-components/ViewNotes';
import '../../../styles/pages/MyJournalV2/components/JournalView.css';

function JournalView({currentDate, journalEntry}){
    
    const [selectedCategory, setSelectedCategory] = useState("Macros");

    const [selectedCategoryData, setSelectedCategoryData] = useState(null);
    
    useEffect(() => {
        if (journalEntry && journalEntry[categoryKey(selectedCategory)]){
            setSelectedCategoryData(journalEntry[categoryKey(selectedCategory)] ? 
                journalEntry[categoryKey(selectedCategory)] 
                : 
                null);
        }
    },[selectedCategory, journalEntry]);

    //console.log(journalEntry);
    //console.log(selectedCategoryData)

    return (
        <div className="journal-view">
            <JournalViewSelector
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
            />
            {selectedCategory === "Macros" ? <ViewMacros 
                currentDate={currentDate}
                macrosData={selectedCategoryData}
            />: null}
            {selectedCategory === "Measurements" ? <ViewMeasurements 
                currentDate={currentDate}
                measurementsData={selectedCategoryData}
                selectedCategory={selectedCategory}
            />: null}
            {selectedCategory === "Personal Records" ? <ViewPersonalRecords 
                currentDate={currentDate}
                personalRecordsData={selectedCategoryData}
                selectedCategory={selectedCategory}
            />: null}
            {selectedCategory === "Calculator Results" ? <ViewCalculatorResults
                currentDate={currentDate}
                calculatorResultsData={selectedCategoryData}
                selectedCategory={selectedCategory}
            />: null}
            {selectedCategory === "Notes" ? <ViewNotes
                currentDate={currentDate}
                notesData={selectedCategoryData}
                selectedCategory={selectedCategory}
            />: null}
        </div>
    );
}

function JournalViewSelector({selectedCategory, setSelectedCategory}){
    
    const categories = ["Macros", "Measurements", "Personal Records", "Calculator Results", "Notes"]

    return (
        <div className="journal-view-selector">
            {categories.map(category => (
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


function CategoryButton({category, selectedCategory, setSelectedCategory}){
    
    const selectCategory = () => {
        setSelectedCategory(category);
    }

    const buttonStyle = {
        backgroundColor: selectedCategory === category ? "#2DEDF3" : "#414141",
        color: selectedCategory === category ? "black" : "white"
    }

    return(
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
        "Macros": "macros",
        "Measurements": "measurements",
        "Personal Records": "personalRecords",
        "Calculator Results": "calculatorResults",
        "Notes": "notes"
    };
    return categoryMap[category];
}

export default JournalView;
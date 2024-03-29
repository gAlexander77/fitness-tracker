import React, { useState } from 'react';
import ViewMacrosTracked from '../components/ViewMacrosTracked';
import ViewPersonalRecords from '../components/ViewPersonalRecords';
import ViewMeasurements from '../components/ViewMeasurements';
import ViewCalculatorResults from '../components/ViewCalculatorResults';
import ViewNotes from '../components/ViewNotes';
import '../../../styles/pages/MyJournal/MyJournal.css';

function ViewJournalEntries(props){
    // Test Data
    const data = props.data;

    let mostRecentEntry = data.journalEntries[data.journalEntries.length-1].journalEntry
    
    const [selectedEntry, setSelectedEntry] = useState(mostRecentEntry);

    return(
        <div className="my-journal-view-journal-entries-component">
            <h1>VIEW JOURNAL ENTRIES</h1>
            <div className="my-journal-view-journal-entries-container">
                <SelectEntry 
                    data={data.journalEntries}
                    selectedEntry={selectedEntry}
                    setSelectedEntry={setSelectedEntry}
                />
                <Entry
                    data={data.journalEntries}
                    selectedEntry={selectedEntry}
                    setSelectedEntry={setSelectedEntry}
                />
            </div>
        </div>
    );
}

function SelectEntry(props){
    
    let entries = props.data.map((data) => data.journalEntry);
    console.log(entries);

    const JournalEntry = (props) => {
        
        const formatDate = (date) => {
            return date.replace(/^(\d{1,2})-(\d{1,2})-(\d{4})$/, (_, month, day, year) => {
                return `${month.padStart(2, "0")}/${day.padStart(2, "0")}/${year}`;
            });
        }

        const selectedEntry = () => {
            props.setSelectedEntry(props.entry);
        }

        const style = {
            color: `${props.selectedEntry === props.entry ? 'black' : 'white'}`,
            backgroundColor: `${props.selectedEntry === props.entry ? '#2DEDF3' : '#353535'}`,
        }
        
        return(
            <button onClick={selectedEntry} style={style}>
                {formatDate(props.entry)}
            </button>
        );
    }
    
    return(
        <div className="my-journal-view-journal-entries-entries-container">
            {entries.reverse().map((entry, index)=>{
                return(
                    <JournalEntry
                        key={index}
                        entry={entry}
                        selectedEntry={props.selectedEntry}
                        setSelectedEntry={props.setSelectedEntry}
                    />
                );
            })}
        </div>
    );
}

function Entry(props){
    
    const [selectedOption, setSelectedOption] = useState("Macros Tracked");

    return(
        <div className="my-journal-view-journal-entries-selected-entry-container">
            <EntryMenu 
                selectedOption={selectedOption} 
                setSelectedOption={setSelectedOption}
            />
            <Display 
                selectedOption={selectedOption} 
                selectedEntry={props.selectedEntry} 
                data={props.data}
            />
        </div>
    );
}

function EntryMenu(props){
    
    const menuOptions = ["Macros Tracked","Personal Records","Measurements","Calculator Results", "Notes"];
    
    const EntryMenuOption = (props) => {
            
        const selectOption = () => {
            props.setSelectedOption(props.option)
            console.log(props.option)
        }

        const backgroundColor = {
            color: `${props.selectedOption === props.option ? 'white' : 'white'}`,
            borderColor: `${props.selectedOption === props.option ? '#2DEDF3' : ''}`,
        }

        return(
            <button style={backgroundColor} onClick={selectOption}>
                {props.option}
            </button>
        );
    }

    return(
        <div className="my-journal-view-journal-entries-menu-container">
            {menuOptions.map((option, index)=>{
                return(
                    <EntryMenuOption
                        key={index}
                        option={option}
                        selectedOption={props.selectedOption}
                        setSelectedOption={props.setSelectedOption}
                    />
                )
            })}
        </div>
    );
}

function Display(props) {
    return(
        <div className="my-journal-view-journal-entries-selected-entry-display">
            {props.selectedOption === "Macros Tracked" ? <ViewMacrosTracked selectedEntry={props.selectedEntry} journalData={props.data} /> : ''}   
            {props.selectedOption === "Personal Records" ? <ViewPersonalRecords selectedEntry={props.selectedEntry} journalData={props.data} /> : ''}   
            {props.selectedOption === "Measurements" ? <ViewMeasurements selectedEntry={props.selectedEntry} journalData={props.data} /> : ''}   
            {props.selectedOption === "Calculator Results" ? <ViewCalculatorResults selectedEntry={props.selectedEntry} journalData={props.data} /> : ''} 
            {props.selectedOption === "Notes" ? <ViewNotes selectedEntry={props.selectedEntry} journalData={props.data} /> : ''}             
        </div>
    );
}

export default ViewJournalEntries;
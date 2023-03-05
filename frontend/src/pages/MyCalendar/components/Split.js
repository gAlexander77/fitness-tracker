import React, { useState } from 'react';

function Split(){
    const [selectedMenu, setSelectedMenu] = useState("current-split")

    const selectMenuHandler = (evt) => {
        setSelectedMenu(evt.target.id);
    }

    return (
        <div className="my-calendar-split-component">
            <h1>SPLIT</h1>
            <div className="my-calendar-split-container">
                <div className="my-calendar-split-menu-container">
                    <button 
                        id="current-split" 
                        onClick={selectMenuHandler} 
                        style={{ color: selectedMenu === "current-split" ? '#2DEDF3' : '' }}
                    >   
                        CURRENT SPLIT
                    </button>
                    <button 
                        id="view-split" 
                        onClick={selectMenuHandler}
                        style={{ color: selectedMenu === "view-split" ? '#2DEDF3' : '' }}
                    >
                        VIEW SPLITS
                    </button>
                    <button 
                        id="create-a-split" 
                        onClick={selectMenuHandler}
                        style={{ color: selectedMenu === "create-a-split" ? '#2DEDF3' : '' }}
                    >
                        CREATE A SPLIT
                    </button>
                    <button 
                        id="create-a-workout-group" 
                        onClick={selectMenuHandler}
                        style={{ color: selectedMenu === "create-a-workout-group" ? '#2DEDF3' : '' }}
                    >
                        CREATE A WORKOUT GROUP
                    </button>
                </div>
                <div className="my-calendar-split-selected-container">
                    {selectedMenu === "current-split" ? <CurrentSplit/> : ''}
                    {selectedMenu}
                </div>
            </div>
        </div>
    );
}

function CurrentSplit(){
    return (
        <div>
        </div>
    );
}

export default Split;
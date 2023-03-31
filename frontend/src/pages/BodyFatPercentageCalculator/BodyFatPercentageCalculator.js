import React from 'react';
import Nav from '../../components/Nav';
import '../../styles/pages/BodyFatPercentageCalculator/BodyFatPercentageCalculator.css';

function BodyFatPercentageCalculator(){
    return(
        <div className="body-fat-percentage-calculator-page">
            <Nav/>
            <h1>Body Fat Percentage Calculator</h1>
        </div>
    );
}

export default BodyFatPercentageCalculator;
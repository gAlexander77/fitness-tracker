import React from 'react';
import Nav from '../../components/Nav';
import '../../styles/pages/BasalMetabolicRateCalculator/BasalMetabolicRateCalculator.css';

function BasalMetabolicRateCalculator(){
    return(
        <div className="basal-metabolic-rate-calculator-page">
            <Nav/>
            <h1>BMR Calculator</h1>
        </div>
    );
}

export default BasalMetabolicRateCalculator;
import React from 'react';
import Nav from '../../components/Nav';
import '../../styles/pages/ProteinIntakeCalculator/ProteinIntakeCalculator.css';

function ProteinIntakeCalculator(){
    return(
        <div className="protein-intake-calculator-page">
            <Nav/>
            <h1>Protein Intake Calculator</h1>
        </div>
    );
}

export default ProteinIntakeCalculator;
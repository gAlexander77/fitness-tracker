import React, {useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../../components/Nav';
import '../../styles/pages/Calculators/Calculators.css';

function Calculators(){
    return(
        <div className="calculators-page">
            <Nav/>
            <div className="calculators-calculators-container">
                <CalculatorButton
                    name="BMI (BODY MASS INDEX) CALCULATOR"
                    link="/calculator/body-mass-index"
                />
                <CalculatorButton
                    name="BMR (BASAL METABOLIC RATE) CALCULATOR"
                    link="/calculator/basal-metabolic-rate"
                />
                <CalculatorButton
                    name="BODY FAT PERCENTAGE CALCULATOR"
                    link="/calculator/body-fat-percentage"
                />
                <CalculatorButton
                    name="PROTEIN INTAKE CALCULATOR"
                    link="/calculator/protein-intake"
                />
            </div>
        </div>
    );
}

function CalculatorButton(props){

    let navigate = useRef(useNavigate());

    const goToLink = () => {
        navigate.current(props.link);
    };

    return(
        <button className="calculators-calculator-btn" onClick={goToLink}>
            {props.name}
        </button>
    )
}

export default Calculators;
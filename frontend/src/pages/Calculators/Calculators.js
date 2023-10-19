import React, {useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../../components/Nav';
import Background from '../../components/Background';
import Footer from '../../components/Footer';
import '../../styles/pages/Calculators/Calculators.css';

function Calculators(){
    return(
        <>
            <Nav/>
            <div className="calculators-page">
                <div className="calculators-calculators-container">
                    <h1>Fitness Calculators</h1>
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
                <Background/>
            </div>
            <Footer/>
        </>
    );
}

function CalculatorButton(props){

    let navigate = useNavigate();

    const goToLink = (event) => {
        if (event.button === 0) {  
            event.preventDefault();
            navigate(props.link);
        }
    };

    return(
        <a className="calculators-calculator-btn" onClick={goToLink} href={props.link}>
            {props.name}
        </a>
    )
}

export default Calculators;
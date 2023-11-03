import React, { useState } from 'react';
import Nav from '../../components/Nav';
import '../../styles/pages/BodyFatPercentageCalculator/BodyFatPercentageCalculator.css';
import { heightToInches, calculateBodyFatPercentage } from './utils';

function BodyFatPercentageCalculator() {
  const [showResults, setShowResults] = useState(false);
  const [input, setInput] = useState({
    gender: 'male',
    age: 0,
    feet: 0,
    inches: 0,
    neckInches: 0,
    waistInches: 0,
    hipInches: 0,
  });

  const [results, setResults] = useState({
    bodyFatPercentage: 0,
  });

  return (
    <div className="body-fat-percentage-calculator-page">
      <Nav />
      <h1>Body Fat Percentage Calculator</h1>
      <Calculator
        input={input}
        setInput={setInput}
        setResults={setResults}
        results={results}
        setShowResults={setShowResults}
      />
      <CalculatorResults
        trigger={showResults}
        bodyFatPercentage={results.bodyFatPercentage}
      />
    </div>
  );
}

function Calculator(props) {
  const [currentGender, setCurrentGender] = useState(5);

  const handleGenderButtonClick = (genderModifier) => {
    setCurrentGender(genderModifier);
  };
  

  const setValueHandler = (event) => {
    const { id, value } = event.target;
    switch (id) {
      case "feet":
        props.setInput((prev) => ({ ...prev, feet: value }));
        break;

      case "inches":
        props.setInput((prev) => ({ ...prev, inches: value }));
        break;

      case "age":
        props.setInput((prev) => ({ ...prev, age: value }));
        break;

      case "neckInches":
        props.setInput((prev) => ({ ...prev, neckInches: value }));
        break;

      case "waistInches":
        props.setInput((prev) => ({ ...prev, waistInches: value }));
        break;

      case "hipInches":
        props.setInput((prev) => ({ ...prev, hipInches: value }));
        break;
      default:
        break;
    }
  };

  const calculateHandler = () => {
    let height = heightToInches(props.input.feet, props.input.inches);

    let bodyFatPercentage = calculateBodyFatPercentage(
      height,
      currentGender,
      props.input.neckInches,
      props.input.waistInches,
      props.input.hipInches,
      props.input.age
    );

    props.setResults({ bodyFatPercentage: bodyFatPercentage });
    if (
       bodyFatPercentage > 0 &&
      props.input.feet !== 0 &&
      props.input.age !== 0 &&
      props.input.neckCircumference !== 0 &&
      props.input.waistCircumference !== 0
    ) {
      props.setShowResults(true);
    } else {
      props.setShowResults(false);
    }
  };

  return (
    <div className="body-fat-percentage-calculator-calculator-component">
      <div className="body-fat-percentage-calculator-calculator-inner">
        <div className="body-fat-percentage-calculator-calculator-left-container">
          <h1 id="title">Height</h1>
          <div id="input-container">
            <input
              id="feet"
              type="number"
              value={props.input.feet}
              onChange={setValueHandler}
            />
            <p id="tag">Feet</p>
          </div>
          <div id="input-container">
            <input
              id="inches"
              type="number"
              value={props.input.inches}
              onChange={setValueHandler}
            />
            <p id="tag">Inches</p>
          </div>
          <h1 id="title">Age</h1>
          <div id="input-container">
            <input
              id="age"
              type="number"
              value={props.input.age}
              onChange={setValueHandler}
            />
            <p id="tag">Years</p>
          </div>
        </div>
        <div className="body-fat-percentage-calculator-calculator-right-container">
          <h1 id="title">Neck Circumference</h1>
          <div id="input-container">
            <input
              id="neckInches"
              type="number"
              value={props.input.neckInches}
              onChange={setValueHandler}
            />
            <p id="tag">Inches</p>
          </div>
          <h1 id="title">Waist Circumference</h1>
          <div id="input-container">
            <input
              id="waistInches"
              type="number"
              value={props.input.waistInches}
              onChange={setValueHandler}
            />
            <p id="tag">Inches</p>
          </div>
          <h1 id="title">Hip Circumference</h1>
          <div id="input-container">
            <input
              id="hipInches"
              type="number"
              value={props.input.hipInches}
              onChange={setValueHandler}
            />
            <p id="tag">Inches</p>
          </div>
        </div>
      </div>
      <div className='body-fat-percentage-calculator-gender-btns'>
        <button
          id='male'
          className={ `body-fat-percentage-calculator-gender-btn ${currentGender === 5 ? 'active' : ''}`}
          onClick={() => handleGenderButtonClick(5)}>
          M
        </button>
        <button
          id='female'
          className={`body-fat-percentage-calculator-gender-btn ${currentGender === -161 ? 'active' : ''}`}
          onClick={() => handleGenderButtonClick(-161)}>
          F
        </button>
      </div>
      <button className="body-fat-percentage-calculator-calculator-calculate-btn" onClick={calculateHandler}>
        Calculate
      </button>
    </div>
  );
}

function CalculatorResults(props) {
  return props.trigger ? (
    <div className="body-fat-percentage-calculator-calculator-results-component">
      <div id="inner">
        <div id="display-container">
          <h1>Body Fat Percentage</h1>
          {<h1>{props.bodyFatPercentage} %</h1>}
        </div>
      </div>
      {true ? <button>Save results to Journal</button> : ""}
    </div>
  ) : '';
}

export default BodyFatPercentageCalculator;

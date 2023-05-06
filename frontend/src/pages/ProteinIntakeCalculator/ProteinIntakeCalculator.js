import React, { useState } from 'react';
import Nav from '../../components/Nav';
import '../../styles/pages/ProteinIntakeCalculator/ProteinIntakeCalculator.css';


// To Do: age, sex

// input - radio button
// sex - radio button
//Pick a reputable source to use as a calculator
import {heightToInches, calculateProtein} from './utils';

function ProteinIntakeCalculator()
{
        const [showResults, setShowResults] = useState(false);

        // create initial values
        const[input,setInput] = useState({
          feet: 0,
          inches: 0,
          weight: 0,
          activity: 0
        });

        // output results
        const[results,setResults] = useState({
          protein: 0,
        })

        return(
          <div className = "protein-intake-calculator-page">
            <h1 id = "title">PROTEIN CALCULATOR</h1>
            <Calculator
              input = {input}
              setInput={setInput}
              setResults={setResults}
              results={results}
              setShowResults={setShowResults}
            />
            <CalculatorResults
              trigger={showResults}
              setTrigger={setShowResults}
              protein={results.protein}
              />
          </div>
        );
}

function Calculator(props)
{
  const setValueHandler = (event) => {
      const { id, value } = event.target;
      switch (id) {
        case "feet":
          props.setInput((prev) => ({ ...prev, feet: value }));
          break;
        case "inches":
          props.setInput((prev) => ({ ...prev, inches: value }));
          break;
        case "weight":
          props.setInput((prev) => ({ ...prev, weight: value }));
          break;
          // Activity level (1,2,3)
        case "activity":
          props.setInput((prev) => ({ ...prev, weight: value }));
          break; 
        default:
          break;
      }
  };

  const calculateHandler = () => {
    let height = heightToInches(props.input.feet, props.input.inches);
    // get result
    let protein = calculateProtein(height,props.input.weight, props.input.activity);
    props.setResults({protein:protein});
    // maybe
    if(protein > 0)
    {
      props.setShowResults(true);
    }
    else
    {
      props.setShowResults(false);
    }
  }


return(
  <div className="protein-intake-calculator-calculator-component">
      <div className="protein-intake-calculator-calculator-inner">
        <div className="protein-intake-calculator-calculator-left-container">
          {/* Get Height */}
          <h1 id="title">Height</h1>
          <div id="input-container">
            {/* input feet */}
            <input
              id="feet"
              type="number"
              value={props.input.feet}
              onChange={setValueHandler}
            />
            <p id="tag">ft</p>
          </div>
          <div id="input-container">
            {/* input inches */}
            <input
              id="inches"
              type="number"
              value={props.input.inches}
              onChange={setValueHandler}
            />
            <p id="tag">in</p>
          </div>
          {/* get weight */}
          <h1 id="title">Weight</h1>
          {/* input lbs */}
          <div id="input-container">
            <input
              id="weight"
              type="number"
              value={props.input.weight}
              onChange={setValueHandler}
            />
            <p id="tag">lbs</p>
          </div>
        </div>
        
        {/* Get Activity Levels (drop down) */}

        <div className="protein-intake-calculator-calculator-right-container">
          <h1 id="title">Activity Level </h1>
          <div id="input-container">
            <div className="protein-intake-calclator-calculator-drop-down">
            <select name = "activity" id="activity"

// Problem here:
            // value={props.input.weight}
            //   onChange={setValueHandler}
            >
              <option value={1}>
                sedentary: little/no exercise
              </option>
              <option value={2}>
                light: exercise 1-3x/week
              </option>
              <option value={3}>
                moderate: exercise 4-5x/week
              </option>
              <option value={4}>
                active: exercise daily
              </option>
              <option value={5}>
                very active: intense daily exercise
              </option>
            </select>
            <div className="protein-intake-calculator-activity-description">
              <br></br>
              <p><b>Exercise:</b><br></br> 15-30 min elevated heart rate </p>
              <p>
                <b>Intense exercise:</b> <br></br>45-12 min elevated heart rate
              </p>
              <p>
                <b>Very intense exercise:</b><br></br> 2+ hrs elevated heart rate 

              </p>
            </div>
            </div>
          </div>


      </div>

      
    </div>
    <button className="protein-intake-calculator-result-btn" onClick={calculateHandler}>
    Calculate
    </button>
    </div>
  );
}

function CalculatorResults(props) {
  return props.trigger ? (
    <div className="protein-intake-calculator-calculator-results-component">
      <div id="inner">
        <div id="display-container">
          <h1>Protein Intake</h1>
          <h1>{props.protein} g/day</h1>
        </div>
      </div>
      {true ? <button>Save results to Journal</button> : ""}
    </div>
  ) : "";
}

export default ProteinIntakeCalculator;

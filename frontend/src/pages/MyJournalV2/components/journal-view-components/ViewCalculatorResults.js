import React from "react";
import "../../../../styles/pages/MyJournalV2/components/journal-view-components/ViewCalculatorResults.css";

function ViewCalculatorResults({ calculatorResultsData }) {
    return (
        <div className="view-calculator-results-component">
            <h1 id="view-calculator-results-title">Calculator Results</h1>
            <DisplayCalculatorResults
                calculatorResultsData={calculatorResultsData}
            />
        </div>
    );
}

function DisplayCalculatorResults({ calculatorResultsData }) {
    return (
        <div className="display-calculator-results">
            {calculatorResultsData.map((result, index) => (
                <CalculatorResult
                    key={index}
                    calculator={result.calculator}
                    result={result.result}
                />
            ))}
        </div>
    );
}

function CalculatorResult({ calculator, result }) {
    return (
        <div className="calculator-result">
            <p id="calculator-name">{calculator}</p>
            <p id="result">{result}</p>
        </div>
    );
}

export default ViewCalculatorResults;

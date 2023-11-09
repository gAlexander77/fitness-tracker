import React from "react";
import "../../../../styles/pages/MyJournalV2/components/journal-editor-components/CalculatorResultsEditor.css";

function CalculatorResultEditor({ calculatorResultsData }) {
    console.log(calculatorResultsData);

    return (
        <div className="calculator-results-editor-component">
            <h1 id="calculator-results-editor-title">Calculator Results</h1>
            <DisplayCalculatorResults
                calculatorResultsData={calculatorResultsData}
            />
        </div>
    );
}

function DisplayCalculatorResults({ calculatorResultsData }) {
    const findResult = (calculator) => {
        const result = calculatorResultsData.find(
            (result) => result.calculator === calculator
        );
        console.log(result);
        return result ? result.result : null;
    };

    return (
        <div className="display-calculator-results">
            <CalculatorResult
                calculator={"Body Mass Index"}
                result={findResult("Body Mass Index")}
                href={"/calculator/body-mass-index"}
            />
            <CalculatorResult
                calculator={"Basal Metabolic Rate"}
                result={findResult("Basal Metabolic Rate")}
                href={"/calculator/basal-metabolic-rate"}
            />
            <CalculatorResult
                calculator={"Body Fat Percentage"}
                result={findResult("Body Fat Percentage")}
                href={"/calculator/body-fat-percentage"}
            />
            <CalculatorResult
                calculator={"Protein Intake"}
                result={findResult("Protein Intake")}
                href={"/calculator/protein-intake"}
            />
        </div>
    );
}

function CalculatorResult({ calculator, result, href }) {
    return (
        <div className="calculator-result">
            <p id="calculator-name">{calculator}</p>
            {result ? (
                <p id="result">{result}</p>
            ) : (
                <a id="result-link" href={href}>
                    Add Entry
                </a>
            )}
        </div>
    );
}

export default CalculatorResultEditor;

export function heightToInches(feet, inches){
    feet = parseInt(feet);
    inches = parseInt(inches);
    if(feet >= 0 && inches >= 0) {
        return ((feet*12)+inches);
    }    
    else {
        return -1;
    } 
}

// Imperial BMI Calculation
// Height (in)
// Weight (lbs)
export function calculateBMI(height, weight) {
    if(height > 0 && weight > 0) {
        return parseFloat((703 * weight / (height*height)).toFixed(2));
    }
    else {
        return -1;
    }
}

export function calculateClassification(bmi) {
    if (bmi < 18.5) 
        return "Underweight";
    else if(bmi >= 18.5 && bmi < 25)
        return "Normal weight";
    else if (bmi >= 25 && bmi < 30)
        return "Overweight";
    else 
        return "Obese";
}
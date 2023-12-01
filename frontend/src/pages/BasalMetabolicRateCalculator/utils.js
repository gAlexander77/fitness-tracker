export function heightToCm(feet, inches) {
    feet = parseInt(feet);
    inches = parseInt(inches);
    if (feet >= 0 && inches >= 0) {
        console.log(((feet * 12) + inches) * 2.54);
        return ((feet*12)+inches) * 2.54;
    }
    else {
        return -1;
    }
}
// men:  66.47 + (6.24 × weight in pounds) + (12.7 × height in inches) − (6.75 × age in years)
export function calculateBMR(height, weight, age, genderModifier){
    if(height > 0 && weight > 0 && age > 0){
        return Math.floor(parseFloat(10 * (weight/2.2046) + 6.25 * height - 5 * age + genderModifier));
    }
    else {
        return -1;
    }
}

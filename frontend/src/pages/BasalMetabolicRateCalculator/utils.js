export function heightToInches(feet, inches) {
    feet = parseInt(feet);
    inches = parseInt(inches);
    if(feet >= 0 && inches >= 0) {
        return ((feet*12)+inches);
    }    
    else {
        return -1;
    } 
}
// men:  66.47 + (6.24 × weight in pounds) + (12.7 × height in inches) − (6.75 × age in years)
export function calculateMaleBMR(height, weight, age){
    if(height > 0 && weight > 0 && age > 0){
        return parseFloat(66.47 + (6.24 * weight) + (12.7 * height) - (6.755 * age));
    }
    else {
        return -1;
    }
}
//     women: 65.51 + (4.35 × weight) + (4.7 × height) - (4.7 × age)
export function calculateFemaleBMR(height, weight, age){
    if(height > 0 && weight > 0 && age > 0){
        return parseFloat(655.51 + (4.35 * weight) + (4.7 * height) - (4.7 * age));
    }
    else {
        return -1;
    }
}


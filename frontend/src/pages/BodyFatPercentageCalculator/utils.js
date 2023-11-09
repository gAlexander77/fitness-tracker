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

export function calculateBodyFatPercentage(height, gender, neck, waist, hip, age) {
    let bodyFatPercentage;
    // men
    
    if (gender === 5) {
        bodyFatPercentage = 86.010 * Math.log10(waist - neck) - 70.041 * Math.log10(height) + 36.76;
    } 
    // women
    else if (gender === -161) {
        console.log(hip);

        bodyFatPercentage = 163.205 * Math.log10(waist - (-hip) - neck) - 97.684 * Math.log10(height) - 78.387;
        console.log(bodyFatPercentage);

    } 
  
    return bodyFatPercentage.toFixed(1);
}
  

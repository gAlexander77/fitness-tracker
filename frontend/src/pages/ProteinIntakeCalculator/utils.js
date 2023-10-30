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

export function calculateProtein(height, weight, gender, activityLevel, age) {
    let bmr;

    // calculate BMR between male and female
    if (gender === 'male') {
      bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else if (gender === 'female') {
      bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }
    
    // Adjust BMR for activity level to find TDEE
    let tdee; // Total Daily Energy Expenditure
    switch (activityLevel) {
      case 'sedentary':
        tdee = bmr * 1.2;
        break;
      case 'light':
        tdee = bmr * 1.375;
        break;
      case 'moderate':
        tdee = bmr * 1.55;
        break;
      case 'active':
        tdee = bmr * 1.725;
        break;
      case 'very active':
        tdee = bmr * 1.9;
        break;
      default:
        tdee = bmr;
    }
  
    // Calculate protein intake as a percentage of total daily caloric intake
    const proteinIntake = (.20 * tdee) / 4; 
    return Math.ceil(proteinIntake);
  }
  

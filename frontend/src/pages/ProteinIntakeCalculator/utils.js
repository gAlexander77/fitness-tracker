
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

// Return ProteinIntake based on user input
export function calculateProtein(height, weight, activityLevel) {
    if(height > 0 && weight > 0 && activityLevel > 0) 
    {
        switch(activityLevel)
        {
            case 1://sedentary
            return (weight*0.36+ height*0.25);

            case 2://moderate
            return (weight*0.54 + height*0.35);

            case 3://active
            return (weight*0.68 + height*0.45);
        }
    }
    else {
        return -1;
    }
}

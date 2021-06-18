interface Metrics {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const calculateExercises = (hours: Array<number>, target: number) : Metrics => {
    const days = hours.length;
    const trainedDays = hours.filter(day => day != 0).length;
    const average = hours.reduce((a, b) => a + b, 0)/days;
    let success = true;
    let rating = 3;
    let ratingString = 'Great job! You made the target!';
    if(average < target) {
      success = false;
      if(average >= target*0.75) {
        rating = 2;
        ratingString = 'You almost got it. Try a little harder next time.';
      }
      else {
        rating = 1;
        ratingString = 'Did you even try...';
      }
    }
    return {
      periodLength : days,
      trainingDays: trainedDays,
      success: success,
      rating: rating,
      ratingDescription: ratingString,
      target: target,
      average: average
    }; 
};

//can use parseArguments name in other files as well
export {calculateExercises};
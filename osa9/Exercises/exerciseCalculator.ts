interface ExerciseParams {
  target: number;
  hours: Array<number>
}

interface Metrics {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const parseArguments = (args: Array<string>) : ExerciseParams => {
  if(args.length < 4) throw new Error('Not enough arguments');

  const collectDays = args.slice(3).map(day => Number(day));

  collectDays.forEach(day => { if(isNaN(day)) throw new Error('Provided values were not numbers!');} );
  
  if(!isNaN(Number(args[2])) && !collectDays.includes(NaN)) {
    return {
      hours: collectDays,
      target: Number(args[2])
    };
  }
  else {
    throw new Error('Provided values were not numbers!');
  }
};

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

try {
  const { target, hours } = parseArguments(process.argv);
  console.log(calculateExercises(hours, target));
} catch (e) {
  if(e instanceof Error){
    console.log('Error, something bad happened, message: ', e.message);
}
}

//can use parseArguments name in other files as well
export {calculateExercises};
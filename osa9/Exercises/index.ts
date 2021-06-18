import express = require('express');
const app = express();
app.use(express.json());
import { calculateBmi } from './bmiCalc';
import { calculateExercises } from './exerciseCalc';

app.get('/hello', (_req: express.Request, res: { send: (arg0: string) => void; }) => {
  res.send('Hello Full Stack!');
});

app.get(`/bmi?`, (req: express.Request, res: express.Response) => {
  const {height, weight} = req.query;

  if(!isNaN(Number(height)) && !isNaN(Number(weight))) {
    const bmi: string = calculateBmi(Number(height), Number(weight));
    res.send({
      height: height,
      weight: weight,
      bmi: bmi
    });
  }
  else res.status(400).send({ error: "malformatted parameters" });
});

app.post('/exercises', (request: express.Request, response: express.Response) => {
  type Params = {
    daily_exercises: Array<number>,
    target: number
  };
  const {daily_exercises, target} = request.body as Params;
  const typedHours = daily_exercises.map(hour => Number(hour));

  if(!daily_exercises || !target)response.json( {error: "parameters missing"} );
  if(typedHours.some(isNaN) || isNaN(Number(target))) response.json( {error: "malformatted parameters"} );

  const result = calculateExercises(typedHours, Number(target));
  response.json(result);

});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculator } from './calculator';

const app = express();

app.get('/ping', (_req, res) => {
  res.send('ping pong');
});

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack');
  });

app.get('/bmi', (req, res) => {
    const height = Number(req.query['height']);
    const weight = Number(req.query['weight']);
    if (isNaN(height) || isNaN(weight)) {
        res.send('{ malformed parameters }');
    } else {
        const bmi = calculateBmi(weight, height);
        const response = {
            height: height,
            weight: weight,
            bmi: bmi
        };
        res.send(response);
    }
});

app.get('/calculate', (req, res) => {
    const { value1, value2, op } = req.query;
    const result = calculator(value1, value2, op);
    res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
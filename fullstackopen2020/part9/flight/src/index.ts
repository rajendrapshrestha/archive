import express from 'express';
import diaryRouter from './routes/diaries';
import patientRouter from './routes//patients';
import dianosesRouter from './routes/diagnoses';
const app = express();
app.use(express.json());

const PORT = 3001;

app.get('/api/ping', (_req, res) => { 
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diaries', diaryRouter);
app.use('/api/patients', patientRouter);
app.use('/api/diagnoses', dianosesRouter);
  
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
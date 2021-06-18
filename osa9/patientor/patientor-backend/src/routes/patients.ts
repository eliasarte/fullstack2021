import express from 'express';
import patientsService from '../services/patientsService';
import toNewPatientEntry from '../utils/assertPatient';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getNonSensitiveEntries());
});

router.post('/:id/entries', (req, res) => {
  try {
    const addedNewEntry = patientsService.addEntry(req.params.id, req.body);
    console.log(addedNewEntry);
    res.json(addedNewEntry);

  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    
    const addedEntry = patientsService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.get('/:id', (req, res) => {
  try {
    res.send(patientsService.getPatient(req.params.id));
  } catch (e) {
    res.status(400).send(e.message);
  }
});

export default router;
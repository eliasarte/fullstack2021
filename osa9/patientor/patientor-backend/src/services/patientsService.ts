import patientsData from '../../data/patients';
import { Patient, NewPatient, Entry } from '../types';
import {v1 as uuid} from 'uuid';
import assertEntry from '../utils/assertEntry';


const patients: Array<Patient> = patientsData;

const getEntries = (): Array<Patient> => {
  return patients;
};

const getNonSensitiveEntries = (): Omit<Patient, 'ssn' | 'entries'>[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = ( entry: NewPatient ): Patient => {
  const newPatientEntry: Patient = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    id: uuid(),
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addEntry = (id: string, entry: Entry): Patient => {
  const patient =  patients.find(patient => patient.id === id);
  console.log("we are here now");
  if (!patient) throw new Error('Patient cannot be found');
  const addThisEntry = assertEntry(entry);
  patient.entries.push({...addThisEntry, id: uuid()});
  return patient;
};

const getPatient = ( id: string): Patient | undefined => {
  const patient = patients.find(patient => patient.id === id);
  if (!patient) {
    throw new Error(`Nothing found with id: ${id}`);
  }
  return patient;
};


export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
  getPatient,
  addEntry
};
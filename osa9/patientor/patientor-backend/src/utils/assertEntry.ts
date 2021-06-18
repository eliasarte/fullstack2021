import { Entry, HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry } from '../types';

const assertHospital = (entry: HospitalEntry): Entry => {
  if(!entry.description) throw new Error('Missing description field');
  if(!entry.date) throw new Error('Missing date field');
  if(!entry.specialist) throw new Error('Missing specialist field');
  if(!entry.discharge) throw new Error('Missing discharge field');
  return entry;
};

const assertOccupational = (entry: OccupationalHealthcareEntry): Entry => {
  if(!entry.description) throw new Error('Missing description field');
  if(!entry.date) throw new Error('Missing date field');
  if(!entry.specialist) throw new Error('Missing specialist field');
  if(!entry.employerName) throw new Error('Missing employerName field');
  return entry;
};

const assertHealth = (entry: HealthCheckEntry): Entry => {
  if(!entry.description) throw new Error('Missing description field');
  if(!entry.date) throw new Error('Missing date field');
  if(!entry.specialist) throw new Error('Missing specialist field');
  if(!entry.healthCheckRating) throw new Error('Missing healthCheckRating field');
  return entry;
};

const assertEntry = ( entry: Entry ): Entry => {
  if(!entry.type) throw new Error('Missing type field');
  switch(entry.type) {
    case "Hospital":
      return assertHospital(entry);
    case "OccupationalHealthcare":
      return assertOccupational(entry);
    case "HealthCheck":
      return assertHealth(entry);
    default:
      throw new Error('Wrong kind of type field');
  }
};

export default assertEntry;
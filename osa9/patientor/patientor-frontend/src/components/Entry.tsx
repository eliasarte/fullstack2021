import React from 'react';
import { Entry, Diagnoses, HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry } from '../types';
import { Icon, Segment  } from 'semantic-ui-react';


const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

/*interface Props {
  e: Entry;
  diagnoses: {
    [id: string]: Diagnosis;
  }
}

const EntryDetails = ({ e, diagnoses }: Props) => {
  return (
    <div>
        {e.date} <i>{e.description}</i>
        {e.diagnosisCodes?.map(code => 
          <li key={code}>{code} {diagnoses[code].name} </li>)}
    </div>
  );
};*/

const HospitalEntryDetails = ({ entry, diagnoses }: {entry: HospitalEntry, diagnoses: Diagnoses}) => {
  const discharge = () => (
    <div>
      <h4>Discharge:</h4>
      <p>date: {entry.discharge?.date}</p>
      criteria: {entry.discharge?.criteria}
    </div>
  );

  return (
    <Segment raised>
      <h3>{entry.date} <Icon name="hospital" size="large"/> </h3>
      <i>{entry.description}</i> 
      {entry.diagnosisCodes !== undefined && entry.diagnosisCodes?.length > 0 && <h4>Diagnoses: </h4>}
      <ul>
      {entry.diagnosisCodes?.map((code => (
        <li key={code}>
          {code} {diagnoses[code].name}
        </li>
      )))}
      </ul>
      {entry.discharge && discharge()}
    </Segment>
  );
};

const OccupationalEntryDetails = ({ entry, diagnoses }: {entry: OccupationalHealthcareEntry, diagnoses: Diagnoses}) => {
  const sickLeave = () => (
    <div>
      <h4>Sick leave:</h4>
      <p>Start date: {entry.sickLeave?.startDate}</p>
      End date: {entry.sickLeave?.endDate}
    </div>
  );
  return (
    <Segment raised>
      <h3>{entry.date} <Icon name="briefcase" size="large"/> {entry.employerName}</h3>
      <i>{entry.description}</i> 
      {entry.diagnosisCodes !== undefined && entry.diagnosisCodes?.length > 0 && <h4>Diagnoses: </h4>}
      <ul>
      {entry.diagnosisCodes?.map((code => (
        <li key={code}>
          {code} {diagnoses[code].name}
        </li>
      )))}
      </ul>
      {entry.sickLeave && sickLeave()}
    </Segment>
  );
};

const HealthCheckDetails = ({ entry, diagnoses }: {entry: HealthCheckEntry, diagnoses: Diagnoses}) => {
  const healthCheckValue = (healthCheckRating: number) => {
    switch(healthCheckRating) {
      case 0:
        return <Icon name="heart" color="green" size="large"/>;
      case 1:
        return <Icon name="heart" color="olive"size="large"/>;
      case 2:
        return <Icon name="heart" color="yellow" size="large"/>;
      default:
        return <Icon name="heart" color="red" size="large"/>;
    }
  };
  return (
    <Segment raised>
      <h3>{entry.date} <Icon name="doctor" size="large"/> </h3>
      <i>{entry.description}</i> 
      {entry.diagnosisCodes !== undefined && entry.diagnosisCodes?.length > 0 && <h4>Diagnoses: </h4>}
      <ul>
      {entry.diagnosisCodes?.map((code => (
        <li key={code}>
          {code} {diagnoses[code].name}
        </li>
      )))}
      </ul>
      {healthCheckValue(entry.healthCheckRating)}
    </Segment>
  );
};

const EntryDetails = ({ entry, diagnoses }: { entry: Entry, diagnoses: Diagnoses }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntryDetails entry={entry} diagnoses={diagnoses} />;
    case "OccupationalHealthcare":
      return <OccupationalEntryDetails entry={entry} diagnoses={diagnoses} />;
    case "HealthCheck":
      return <HealthCheckDetails entry={entry} diagnoses={diagnoses} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;

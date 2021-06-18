import React from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";

import { apiBaseUrl } from "../constants";
import { useStateValue, setPatient, setDiagnosesList, addEntry } from '../state';
import { Container, Icon, SemanticICONS, Button } from 'semantic-ui-react';
import { Gender, Patient, Diagnosis } from '../types';
import EntryDetails from '../components/Entry';
import AddEntryModal from "../AddEntryModal";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patient, diagnoses }, dispatch ] = useStateValue();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  React.useEffect(() => {
    const getPatientData = async () => {
      try {
          if(patient?.id !== id){
            const {data: patientFromApi} = await  axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
            dispatch(setPatient(patientFromApi));
          }                
      } catch (e) {
          console.error(e);
      }
    };
    const getDiagnosesData = async () => {
      try {
          const {data: diagnosesListFromApi}= await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
          );
          dispatch(setDiagnosesList(diagnosesListFromApi));
      } catch (e) {
          console.log(e);
        }
      };
    void getDiagnosesData();
    void getPatientData();
  }), [dispatch];

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: patientUpdated } = await axios.post<Patient>(
      `${apiBaseUrl}/patients/${id}/entries`, values
      );
      dispatch(addEntry(patientUpdated));
      closeModal();
    } catch (e) {
      console.error(e.response?.data || 'Unknown Error');
      setError(e.response?.data?.error || 'Unknown error');
    }
  };


  const getGenderIcon = (gender?: Gender): string => {
    switch (gender) {
      case "male":
        return "mars";
      case "female":
        return "venus";
      default:
        return "genderless";
    }
  };
  const gender = getGenderIcon(patient?.gender) as SemanticICONS;

  return (
    <div className="PatientPage">
      <Container>
        <h3>{patient?.name} <Icon name={gender} /></h3>
        <p>
          ssn: {patient?.ssn} <br />
          occupation: {patient?.occupation}
        </p>
        <h1>entries</h1>
        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
        />
        <Button onClick={() => openModal()}>Add New Entry</Button>
        {patient?.entries.length !== 0 && patient?.entries.map(entry => {
          return (
            <Container key={entry.id}>
            <EntryDetails entry={entry} diagnoses={diagnoses} />
            </Container>
           );
          }
        )}
      </Container>
    </div>
  );
};

export default PatientPage;

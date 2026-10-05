import { v4 as uuidv4 } from 'uuid';
import patients from '../../data/patients';
import {
    PatientEntry, NonSensitivePatientEntry, NewPatientEntry
    } from '../types';

const getPatients = (): Array<PatientEntry> => {
    return patients;
};

const getPatientInfo = (id: string): PatientEntry | undefined => {
    const patient: PatientEntry | undefined = patients.find(patient => patient.id === id);
    if (patient && !patient.entries) {
        patient.entries = [];
    }
    return patient;
};

const getNonSensitivePatients = (): NonSensitivePatientEntry [] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation
    }));
};

const addPatient = ( entry: NewPatientEntry ): PatientEntry => {
    const newPatientEntry = {
      id: uuidv4(),
      ...entry
    };
    patients.push(newPatientEntry);
    return newPatientEntry;
  };


export default {
    getPatients,
    getPatientInfo,
    getNonSensitivePatients,
    addPatient
};
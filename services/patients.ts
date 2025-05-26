import patientData from "../data/patients";
import {
  NonSensitivePatient,
  Patient,
  NewPatientEntry,
  Entry,
  NewEntry,
} from "../types";
import { v4 as uuidv4 } from "uuid";

const getEntries = (): Patient[] => {
  return patientData;
};

const patients: Patient[] = getEntries();

const getPatient = (id: string): Patient => {
  const foundPatient: Patient | undefined = patients.find((e) => e.id === id);
  if (!foundPatient) {
    throw new Error(`Patient with id ${id} not found`);
  }
  return foundPatient;
};

const getNonSensitivePatientEntry = (id: string): NonSensitivePatient => {
  const foundPatient: Patient | undefined = patients.find((e) => e.id === id);

  if (!foundPatient) {
    throw new Error(`Patient with id ${id} not found`);
  }

  const { ssn: _ssn, ...nonSensitiveData } = foundPatient;
  return nonSensitiveData;
};

const getPatientEntries = (id: string): Entry[] => {
  const foundPatient: Patient | undefined = patients.find((e) => e.id === id);

  if (!foundPatient) {
    throw new Error(`Patient with id ${id} not found`);
  }

  const { entries } = foundPatient;
  return entries;
};

const addEntry = (id: string, entry: NewEntry): Entry => {
  const entryId: string = uuidv4();

  const newEntry: Entry = {
    id: entryId,
    ...entry,
  } as Entry;

  const patient = getPatient(id);
  patient.entries.push(newEntry);

  return newEntry;
};

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return patients.map(({ ssn: _ssn, ...rest }): NonSensitivePatient => rest);
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const id: string = uuidv4();

  const newPatientEntry: Patient = {
    id,
    ...entry,
  } as Patient;

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
  getNonSensitivePatientEntry,
  getPatientEntries,
  addEntry,
};

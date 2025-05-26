import diagnosesData from "../data/diagnoses";
import { Diagnosis } from "../types";

const getEntries = (): Diagnosis[] => {
  return diagnosesData;
};

// const diagnoses: Diagnosis[] = getEntries();

export default {
  getEntries,
};

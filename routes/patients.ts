import express, { NextFunction, Request, Response } from "express";
import z from "zod";
import {
  Entry,
  NewPatientEntry,
  NonSensitivePatient,
  Patient,
  NewEntry,
} from "../types";
import PatientServices from "../services/patients";
import { newEntrySchema, newPatientSchema } from "../utils";
const router = express.Router();

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const formattedData: NonSensitivePatient =
    PatientServices.getNonSensitivePatientEntry(id);
  res.send(formattedData);
});

router.get("/:id/entries", (req, res) => {
  const id = req.params.id;
  const formattedData: Entry[] = PatientServices.getPatientEntries(id);
  res.send(formattedData);
});

router.get("/", (_req, res: Response<NonSensitivePatient[]>) => {
  const formattedData: NonSensitivePatient[] =
    PatientServices.getNonSensitiveEntries();
  res.send(formattedData);
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    newPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const newEntryParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    newEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.post(
  "/:id/entries",
  newEntryParser,
  (req: Request<{ id: string }, unknown, NewEntry>, res: Response<Entry>) => {
    const id = req.params.id;
    const addedEntry = PatientServices.addEntry(id, req.body);
    res.json(addedEntry);
  }
);

router.post(
  "/",
  newPatientParser,
  (req: Request<unknown, unknown, NewPatientEntry>, res: Response<Patient>) => {
    const addedEntry = PatientServices.addPatient(req.body);
    res.json(addedEntry);
  }
);

router.use(errorMiddleware);

export default router;

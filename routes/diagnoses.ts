import express, { NextFunction, Request, Response } from "express";
import z from "zod";
import { Diagnosis } from "../types";
import diagnosesServices from "../services/diagnoses";
const router = express.Router();

router.get("/", (_req, res: Response<Diagnosis[]>) => {
  res.send(diagnosesServices.getEntries());
});

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

router.use(errorMiddleware);

export default router;

import { Gender, HealthCheckRating } from "./types";
import z from "zod";

const diagnosisSchema = z.object({
  code: z.string(),
  name: z.string(),
  latin: z.string().optional(),
});

const baseEntrySchema = z.object({
  date: z.string(),
  description: z.string(),
  specialist: z.string(),
  type: z.string(),
  diagnosisCodes: z.array(diagnosisSchema.shape.code).optional(),
});

const hospitalEntrySchema = baseEntrySchema.extend({
  type: z.literal("Hospital"),
  discharge: z.object({
    date: z.string(),
    criteria: z.string(),
  }),
});

const occupationalEntrySchema = baseEntrySchema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  sickLeave: z.object({ startDate: z.string(), endDate: z.string() }),
});

const healthCheckEntrySchema = baseEntrySchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.nativeEnum(HealthCheckRating),
});

export const newEntrySchema = z.discriminatedUnion("type", [
  hospitalEntrySchema,
  occupationalEntrySchema,
  healthCheckEntrySchema,
]);

export const newPatientSchema = z.object({
  name: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
  ssn: z.string().optional(),
  dateOfBirth: z.string().optional(),
  entries: z.array(newEntrySchema),
});

import express from "express";
import diagnosesRouter from "./routes/diagnoses";
import patientRouter from "./routes/patients";
const app = express();
import cors from "cors";
app.use(express.json());
app.use(cors());
app.use("/api/patients", patientRouter);
app.use("/api/diagnoses", diagnosesRouter);

const PORT = 3001;

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here ping");
  res.send("pong");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

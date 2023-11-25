import "dotenv/config";
import express, { json } from "express";
import createHttpError, { isHttpError } from "http-errors";
import cors from "cors";
import morgan from "morgan";
import noteRoutes from "./route/note.js";
import authRoutes from "./route/user.js";

const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(json());

app.get("/", (req, res) => {
  res.send("hello world");
});

//define api route
app.use("/api/note", noteRoutes);
app.use("/api/user", authRoutes);

//error setup
app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found"));
});

app.use((error, req, res, next) => {
  console.error(error);
  let errorMessage = "An unknown error has occurred";
  let statusCode = 500;
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: errorMessage });
});

export default app;

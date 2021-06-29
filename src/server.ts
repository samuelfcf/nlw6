import "reflect-metadata";
import express, { NextFunction, Request, Response } from 'express';
import "express-async-errors";
import router from "./routes";

import "./database"
import AppError from "./errors/AppError";

const app = express();

app.use(express.json());

app.use(router);

//middleware de ERRO!
app.use((err: AppError, request: Request, response: Response, next: NextFunction) => {
  // erro é daqueles que é lançado?
    if(err instanceof AppError) {
      return response.status(404).json({
        error: err.message,
        status: err.status
      });
    }
    // se não for erro lançado, retorna um erro de server interno.
    return response.status(500).json({
        status: "error",
        message: "Internal server error"
      });
  }
);

app.listen(3000, () => {
  console.clear();
  console.log("Server is running!")
});


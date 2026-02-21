require("dotenv").config();
require("express-async-errors");

// importing req,res types
import { Request, Response } from "express";

// requiring express
const express = require("express");
const app = express();

// DB
const connectDB: (url: string) => any = require("./db/connect.ts");

// testing route
app.get("/", (req: Request, res: Response) => {
  res.send("Still testing the water");
});

const port: number | string = process.env.PORT || 3000;

const start = async (): Promise<void> => {
  try {
    // here is the mongoDB connection...
    await connectDB(process.env.MONGODB_URI!);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`),
    );
  } catch (error) {
    console.log(error);
  }
};

start();

import "express-async-errors";
import dotenv from "dotenv";
dotenv.config();

// importing req,res types
import { Request, Response } from "express";

// importing express
import express from "express";
const app = express();

// DB
import { connectDB } from "./db/connect";

// error handler requiring

// common middleware
app.use(express.json());
// app.use(express.static())

// testing route
app.get("/", (req: Request, res: Response) => {
  res.send("Still testing the water");
});

const port: number = (process.env.PORT as unknown as number) || 3000;

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

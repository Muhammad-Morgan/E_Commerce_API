import "express-async-errors";
import dotenv from "dotenv";
dotenv.config();

// importing req,res types
import { Request, Response } from "express";

// importing express
import express from "express";
const app = express();

// rest of packages
import morgan from "morgan";

// DB
import { connectDB } from "./db/connect";

// error handler importing
import { errorHandlerMiddleware } from "./middleware/error-handler";
import { notFoundMiddleware } from "./middleware/not-found";

// importing routes
import { authRouter } from "./routes/auth";

// common middleware
app.use(express.json());
app.use(morgan("tiny"));
// app.use(express.static())

// testing route
app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Still testing the water");
});

// routes
app.use("/api/v1/auth", authRouter);

// error fallback - Order is IMP
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port: number = (process.env.PORT as unknown as number) || 5000;

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

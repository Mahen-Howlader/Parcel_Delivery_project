import express, { type Request, type Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { router } from "./router/router";
export const app = express();



app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use("/api/v1", router);


app.get("/", (req: Request, res: Response) => {
    res.send("Hello World")
});

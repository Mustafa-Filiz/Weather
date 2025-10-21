import express, { type Request, type Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import api from "./api.js";

dotenv.config({ path: path.join(__dirname, "./.config.env") });

const app = express();
const port = 3000;

app.use(cors());

// to parse the incoming requests in urlencodedform
app.use(express.urlencoded({ extended: true }));
// to serve the static files
app.use(express.static(path.join(__dirname, "public")));

// redirect incoming requests to api.js
app.use("/api/v1", api);
app.all("*", (req, res, next) => {
  next(
    new Error(`Can't find ${req.originalUrl} on this server!`, { cause: 404 })
  );
});

export default app;

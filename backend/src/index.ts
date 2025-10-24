import { getCurrent, getForecast } from "#controllers.js";
import cors from "cors";
import express from "express";

const app = express();
const port = process.env.PORT ?? 5000;

app.use(cors());

app.get("/forecast", getForecast);
app.get("/current", getCurrent);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${String(port)}`);
});

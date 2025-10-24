/* eslint-disable @typescript-eslint/restrict-template-expressions */
import axios from "axios";
import { Request, Response } from "express";

export const getForecast = async (req: Request, res: Response) => {
  const city = req.query.city as string;
  if (!city) {
    return res.status(400).json({ error: "City is required" });
  }
  try {
    const response = await axios.get(
      `${process.env.BASE_API_URL}/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${city}&days=3&aqi=yes&alerts=no`,
    );

    return res.json(response.data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
      return res.status(500).json({ error: error.message });
    }
  }
};

export const getCurrent = async (req: Request, res: Response) => {
  const city = req.query.city as string;
  if (!city) {
    return res.status(400).json({ error: "City is required" });
  }
  try {
    const response = await axios.get(`${process.env.BASE_API_URL}/current.json?key=${process.env.WEATHER_API_KEY}&q=${city}&aqi=yes`);

    return res.json(response.data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
      return res.status(500).json({ error: error.message });
    }
  }
};

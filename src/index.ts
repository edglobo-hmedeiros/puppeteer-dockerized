import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

import googleSearch from "./util/searchGoogleMainResults";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

interface GoogleSerachQueryParams {
  searchQuery: string;
}

app.get("/", async (req: Request, res: Response) => {
  const { searchQuery } = req.query as unknown as GoogleSerachQueryParams;

  if (!searchQuery) res.status(400).json("Parametros incorretos.");

  const start = new Date().getTime();
  const results = await googleSearch(searchQuery);
  const end = new Date().getTime();

  const executionTime = Math.abs((end - start) / 1000);

  res.json({ executionTime, results });
});

app.listen(port, () => {
  console.log(`[SERVER]: Servidor iniciado em http://localhost:${port}`);
});

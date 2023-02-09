import express, { Express, Request, Response } from "express";
import "express-async-errors";
import path from "path";
import googleSearch from "./util/searchGoogleMainResults";

const app: Express = express();
const port = 5501;

interface GoogleSerachQueryParams {
  searchQuery: string;
}

app.use("/static", express.static(path.join(__dirname, "assets")));

app.get("/", async (req: Request, res: Response) => {
  const { searchQuery } = req.query as unknown as GoogleSerachQueryParams;

  if (!searchQuery) res.status(400).json("Parametros incorretos.").send();
  console.log(searchQuery);

  const start = new Date().getTime();
  const results = await googleSearch(searchQuery);
  const end = new Date().getTime();

  const executionTime = Math.abs((end - start) / 1000);

  res.json({ executionTime, results }).send();
});

app.get("/checkout", async (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "/assets/checkout.html"));
});

app.listen(port, () => {
  console.log(`[SERVER]: Servidor iniciado em http://localhost:${port}`);
});

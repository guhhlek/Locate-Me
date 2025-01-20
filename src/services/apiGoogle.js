/* global process */
import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());

app.get("/autocomplete", async (req, res) => {
  const query = req.query.input;
  const apiKey = process.env.VITE_GOOGLE_MAPS_API_KEY;

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
        query
      )}&types=address&key=${apiKey}`
    );

    const data = await response.json();
    if (data.status === "OK") {
      res.json(data);
    } else {
      console.error(`Erro na API autocomplete: ${data.status}`);
      res.status(400).json({
        error: "Erro na API Places",
        status: data.status,
      });
    }
  } catch (error) {
    res.status(500).json({ error: `Erro ao buscar sugestões: ${error}` });
  }
});

app.get("/place-details", async (req, res) => {
  const placeId = req.query.place_id;
  const apiKey = process.env.VITE_GOOGLE_MAPS_API_KEY;

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`
    );

    const data = await response.json();
    if (data.status === "OK") {
      res.json(data.result);
    } else {
      console.error(`Erro na API place-details: ${data.status}`);
      res.status(400).json({
        error: "Erro ao buscar detalhes do lugar",
        status: data.status,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: `Erro ao buscar detalhes do lugar: ${error}` });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

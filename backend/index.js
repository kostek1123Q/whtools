import express from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend whTools działa!");
});

app.post("/api/shorten", (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "Brak url" });

  // Prosta logika generująca stały skrót
  const shortUrl = "https://whtools.link/xyz123";

  res.json({ shortUrl });
});

app.listen(port, () => {
  console.log(`Serwer działa na porcie ${port}`);
});

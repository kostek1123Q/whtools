import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const db = {}; // prosta pamięć w RAM - przy restarcie traci dane

function generateCode() {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

app.post('/api/shorten', (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "No URL provided" });

  try {
    new URL(url);
  } catch {
    return res.status(400).json({ error: "Invalid URL" });
  }

  let code;
  do {
    code = generateCode();
  } while (db[code]);

  db[code] = url;

  res.json({ shortCode: code });
});

app.get('/s/:code', (req, res) => {
  const { code } = req.params;
  const originalUrl = db[code];
  if (!originalUrl) {
    return res.status(404).send("Not found");
  }
  res.redirect(originalUrl);
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

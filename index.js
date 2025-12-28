import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/health", (req, res) => {
  res.send("OK");
});

app.get("/gamepass/:userId/:passId", async (req, res) => {
  try {
    const url = `https://inventory.roproxy.com/v1/users/${req.params.userId}/items/GamePass/${req.params.passId}/is-owned`;
    const r = await fetch(url);
    const data = await r.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.toString() });
  }
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});

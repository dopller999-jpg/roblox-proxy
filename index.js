import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

async function proxy(url) {
  const r = await fetch(url);
  return await r.json();
}

app.get("/gamepass/:userId/:passId", async (req, res) => {
  const data = await proxy(
    `https://inventory.roproxy.com/v1/users/${req.params.userId}/items/GamePass/${req.params.passId}/is-owned`
  );
  res.json(data);
});

app.listen(PORT, () => console.log("Proxy running"));

import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Proxy online");
});

app.get("/gamepasses/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const r = await fetch(`https://games.roblox.com/v1/users/${userId}/games?accessFilter=2&limit=50`);
    const data = await r.json();

    const gamepasses = [];

    for (const game of data.data || []) {
      const gp = await fetch(`https://games.roblox.com/v1/games/${game.id}/game-passes?limit=100`);
      const gpData = await gp.json();

      for (const pass of gpData.data || []) {
        gamepasses.push({
          id: pass.id,
          name: pass.name,
          price: pass.price
        });
      }
    }

    res.json(gamepasses);
  } catch (e) {
    res.json([]);
  }
});

app.get("/gamepass/:userId/:passId", async (req, res) => {
  const { userId, passId } = req.params;

  try {
    const r = await fetch(`https://inventory.roblox.com/v1/users/${userId}/items/GamePass/${passId}`);
    const data = await r.json();

    res.json({ owns: data.data && data.data.length > 0 });
  } catch {
    res.json({ owns: false });
  }
});

app.listen(PORT, () => {
  console.log("Running on " + PORT);
});

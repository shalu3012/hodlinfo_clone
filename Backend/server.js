const express = require("express");
const axios = require("axios");
const db = require("./db");
const cors = require("cors");

const app = express();
app.use(cors());
let data = [];

app.get("/api", async (req, res) => {
  try {
    const response = await axios.get("https://api.wazirx.com/api/v2/tickers");
    Object.values(response.data).map((item) => {
      data.push(item);
    });
    data = data.slice(0, 10);
    const filteredData = data.map(
      ({ name, last, buy, Sell, volume, base_unit }) => ({
        name,
        last,
        buy,
        Sell,
        volume,
        base_unit,
      })
    );
    db.collection("myCollection").insertMany(filteredData, (err, result) => {
      if (err) {
        console.error("Error inserting documents:", err);
        return;
      }
      res.send({
        message: `Inserted ${result.insertedCount} documents`,
        data: filteredData,
      });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/getItems", async (req, res) => {
  try {
    const itemsCursor = await db.collection("myCollection").find({});
    const items = await itemsCursor.toArray();

    res.send(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(5000, console.log("Server is listening on port 5000."));

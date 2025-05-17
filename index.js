const express = require("express");
const axios = require("axios");
const app = express();
app.use(express.json());
const bodyParser = require("body-parser");
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
const port = 3000;

app.get("/", async (req, res) => {
  try {
    const breeds = await axios.get("https://dog.ceo/api/breeds/list/all");
    res.render("index.ejs", { breeds: breeds.data.message });
  } catch (error) {
    res.render("index.ejs", { breeds: {}, error: "Failed to fetch breeds." });
  }
});

app.post("/random", async (req, res) => {
  try {
    const response = await axios.get("https://dog.ceo/api/breeds/image/random");
    res.json({ randomImage: response.data.message });
  } catch {
    res.status(500).json({ error: "Failed to fetch random image." });
  }
});
app.post("/byBreed", async (req, res) => {
  const { breed } = req.body;
  try {
    const response = await axios.get(
      `https://dog.ceo/api/breed/${breed}/images/random`
    );
    res.json({ breedImage: response.data.message });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch breed image." });
  }
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

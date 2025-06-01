const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const Song = require("./models/song.model.js");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello from Node API server");
});

const axios = require("axios");

app.get("/api/movie-search-by-name", async (req, res) => {
  const { s, page } = req.query;

  if (!s) {
    return res.status(400).json({ error: "Missing search query (s)" });
  }

  try {
    const response = await axios.get("https://www.omdbapi.com/", {
      params: {
        apikey: process.env.OMDB_API_KEY,
        s: s,
        page: page || 1,
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch from OMDB", error: error.message });
  }
});

app.get("/api/movie-search-by-id", async (req, res) => {
  const { i } = req.query;

  if (!i) {
    return res.status(400).json({ error: "Missing IMDb ID (i)" });
  }

  try {
    const response = await axios.get("https://www.omdbapi.com/", {
      params: {
        apikey: process.env.OMDB_API_KEY,
        i: i,
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch from OMDB", error: error.message });
  }
});


app.delete("/api/delete-song/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const song = await Song.findByIdAndDelete(id, req.body);
    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }
    const deletedSong = await Song.findById(id);
    res.status(200).json({ message: "Song is Updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/create-song", async (req, res) => {
  try {
    const song = await Song.create(req.body);
    res.status(200).json(song);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/api/update-song/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const song = await Song.findByIdAndUpdate(id, req.body);
    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }
    const updatedSong = await Song.findById(id);
    res.status(200).json({ message: "Song is Updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/view-songs", async (req, res) => {
  try {
    const songs = await Song.find({});
    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/view-song/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const song = await Song.findById(id);
    res.status(200).json(song);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to database!");
    app.listen(process.env.PORT || 3000, () => {
      console.log("server running on port 3000");
    });
  })
  .catch((e) => {
    console.log("db connection failed!@");
    console.log("error is", e);
  });

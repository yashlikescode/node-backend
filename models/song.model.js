const mongoose = require("mongoose");

const SongSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Song Name is Required"],
    },
    mood: {
      type: String,
      required: [true, "Song Name is Required"],
    },
    language: {
      type: String,
      required: [true, "Song Name is Required"],
    },
    artist: {
      type: [String],
      required: [true, "Song Name is Required"],
    },
    duration: {
      type: Number, // duration in seconds
      required: [true, "Duration is required"],
      min: [1, "Duration must be at least 1 second"],
    },
    releaseDate: {
      type: Date,
      required: [true, "Release date is required"],
    },
    coverImageUrl: {
      type: String,
      default: null,
    },
    audioUrl: {
      type: String,
      required: [true, "Audio URL is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Song = mongoose.model("Song",SongSchema);
module.exports = Song;
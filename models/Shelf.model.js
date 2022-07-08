const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const shelfSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    authorname: {
      type: String,
      required: true,
    },
    publicationH: {
      type: String,
      required: true,
    },
    publicationD: {
      type: Date,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    publicationY: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Shelf = mongoose.model("Shelf", shelfSchema);
module.exports = Shelf;

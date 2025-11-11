const mongoose = require("mongoose");

const UrlSchema = new mongoose.Schema({
  fullUrl: { type: String, require: true },
  shortUrl: { type: String, require: true, unique: true, index: true },
  clicks: { type: Number, default: 0, require: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const UrlModel = mongoose.model("url", UrlSchema);

module.exports = {
  UrlModel
};

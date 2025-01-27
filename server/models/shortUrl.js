// const mongoose = require('mongoose');

// const linkSchema = new mongoose.Schema({
//   original_url: { type: String, required: true },
//   shortened_url: { type: String, required: true, unique: true },
//   user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User',required:true },
//   expiration_date: { type: Date, default: null },
//   click_count: { type: Number, default: 0 },
// }, { timestamps: true });

// module.exports = mongoose.model('Link', linkSchema);
const mongoose = require("mongoose");

const shortUrlSchema = new mongoose.Schema(
  {
    shortened_url: {
      type: String,
      unique: true,
      required: true,
    },
    original_url: {
      type: String,
      required: true,
    },
    clicks: [
      {
        timestamp: { type: Date },
        ipAddress: { type: String }, // IP address of the user
        device: { type: String }, // e.g., Mobile, Desktop
        os: { type: String }, // e.g., iOS, Windows, Android
        browser: { type: String }, // Browser name
        browserVersion: { type: String }, // Browser version
      },
    ],
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    remarks: {
      type: String,
      required: true,
    },
    expirationdate: {
      type: Date,
    },
  },
  { timestamps: true }
);

const ShortUrlModel = mongoose.model("shortUrl", shortUrlSchema);
module.exports = ShortUrlModel;

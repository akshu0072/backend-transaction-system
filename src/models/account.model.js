const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [ true ,"Account must be associated with a user"]
  },
  status: {
    enum: ["active", "inactive", "suspended"],
    default: "active",
    message: "Status can be either Active, Inactive, or Suspended"
  }
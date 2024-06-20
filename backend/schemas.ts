import { ObjectId } from "mongoose";

const db = require("mongoose");
const Schema = db.Schema;



// User Schema
const user = new Schema({
  name: { type: String, required: true },
  whatsappNumber: { type: String, required: true, index: true, unique: true },
  currency: { type: String, required: true },
});

const User = db.model("User", user, "users");

// Expense Schema
const expense = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const Expense = db.model("Expense", expense, "expenses");

module.exports = {
  User,
  Expense,
};

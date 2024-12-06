const mongoose = require("mongoose");

// Define a schema for messages
const messageSchema = new mongoose.Schema({
  sender: {
    id: { type: mongoose.Schema.Types.ObjectId, required: true },
    model: { type: String, enum: ["Reseller", "Supplier"], required: true }, // Polymorphic reference
  },
  receiver: {
    id: { type: mongoose.Schema.Types.ObjectId, required: true },
    model: { type: String, enum: ["Reseller", "Supplier"], required: true }, // Polymorphic reference
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

// Create the Message model
const Message = mongoose.model("Message", messageSchema);

module.exports = Message;

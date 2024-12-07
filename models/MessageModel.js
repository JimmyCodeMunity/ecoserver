const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Reseller",
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Supplier",
  },
  messageType: {
    type: String,
    default:'text'
  },
  content:{
    type: String

  },
  timeStamp: {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.model("message", messageSchema);
module.exports = Message;

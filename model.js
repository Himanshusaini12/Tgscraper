// model.js
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  Mid: {
    type: Number,
    unique: true
  },
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;

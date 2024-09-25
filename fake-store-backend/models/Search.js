const mongoose = require('mongoose');

const searchSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
    unique: true,
  },
  searchCount: {
    type: Number,
    default: 1,
  },
}, { timestamps: true });

module.exports = mongoose.model('Search', searchSchema);

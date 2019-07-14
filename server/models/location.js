const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a schema
const locationSchema = new Schema({
  user: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  geo: {
    type: { type: String },
    coordinates: []
  }
}, {
  timestamps: true
});

locationSchema.index({ geo: "2dsphere" });

// Create a model
const Location = mongoose.model('location', locationSchema);

// Export the model
module.exports = Location;
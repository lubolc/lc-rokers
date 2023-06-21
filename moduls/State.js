const mongoose = require('mongoose');
const { Schema } = mongoose;

const stateSchema = new Schema({
  value: { type: String }
});

mongoose.model('states', stateSchema);

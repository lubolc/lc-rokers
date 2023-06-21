const mongoose = require('mongoose');
const { Schema } = mongoose;

const neighborhoodSchema = new Schema({
  value: { type: String }
});

mongoose.model('neighborhoods', neighborhoodSchema);

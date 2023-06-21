const mongoose = require('mongoose');
const { Schema } = mongoose;

const propertyTypeSchema = new Schema({
  value: { type: String }
});

mongoose.model('propertyTypes', propertyTypeSchema);

const mongoose = require('mongoose');
const { Schema } = mongoose;

const constructionTypeSchema = new Schema({
  value: { type: String }
});

mongoose.model('constructionTypes', constructionTypeSchema);
// constructionType:

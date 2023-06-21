const mongoose = require('mongoose');
const { Schema } = mongoose;
const ObjectId = mongoose.Schema.ObjectId;

const offerSchema = new Schema({
  number: { type: Number, required: 'Offer Number is required' },
  area: Number,
  description: String,
  phoneNumber: String,
  phoneNumbers: [{ type: String, type: String, lowercase: true, trim: true }],
  price: Number,
  address: String,
  info: String,
  propertyOwnerName: { type: String, type: String, lowercase: true, trim: true },
  floor: Number,
  constructionTypeId: { type: ObjectId, required: true, ref: 'constructionTypes' },
  propertyTypeId: { type: ObjectId, required: true, ref: 'propertyTypes' },
  state: { type: ObjectId, required: true, ref: 'states' },
  neighborhoodId: { type: ObjectId, required: true, ref: 'neighborhoods' },
  addedOn: { type: Date },
  addedFrom: { type: ObjectId, ref: 'users' },
  lastCall: { type: Date },
  nextCall: { type: Date },
  isDeleted: { type: Boolean, default: false },
  deletedOn: { type: Date, default: null }
});

// offerSchema.post('save', function(error, doc, next) {
//     if (error.name === 'MongoError' && error.code === 11000) {
//       next(new Error('There was a duplicate key error'));
//     } else {
//       next(error);
//     }
//   });

mongoose.model('offers', offerSchema);

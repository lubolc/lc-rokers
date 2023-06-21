const mongoose = require('mongoose')
const {Schema} = mongoose
const ObjectId = mongoose.Schema.ObjectId;

const phoneSchema = new Schema({
   
    phoneNumber: {  type: String, required: true },
    offerId:     {  type: ObjectId, required: true, ref: 'offers' }
   
})
  

mongoose.model('phoneNumbers', phoneSchema)

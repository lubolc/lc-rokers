const mongoose = require('mongoose')
const {Schema} = mongoose
const ObjectId = mongoose.Schema.ObjectId;
///  IT IS NOT USING !!!!
const OfferPhoneIds = new Schema({
   
    phoneId:    { type: ObjectId, required: true, ref: 'phoneNumbers'},
    offerId:    { type: ObjectId, required: true, ref: 'offers' },
    isMein:     { type: Boolean, required: true }

})
  

mongoose.model('offerPhoneIds', OfferPhoneIds)

const mongoose = require('mongoose')
const {Schema} = mongoose


const userSchema = new Schema({
    googleId: String,   
    displayName: String,
    familyName: String,
    givenName: String,
    email: String,
    gender: String,
    role:{ type: String, default:"user"}
})


mongoose.model('users', userSchema)

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

//défini la structure des utilisateur en bdd
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, require: true }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);

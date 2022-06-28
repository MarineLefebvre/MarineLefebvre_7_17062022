const mongoose = require('mongoose');

//Défini la structure du post en bdd

const thingSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    userId: { type: String, required: true },
    dateCreation: {type: Date, required: true},
    likes: {type: Number, required: false },
    usersLiked: {type: [String], required: false},
});

module.exports = mongoose.model('Post', thingSchema);

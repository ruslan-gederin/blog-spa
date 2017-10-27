const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create post schema
const postSchema = new Schema({
    title: String,
    preview: String,
    post: String
});

// Create the model class
const ModelClass = mongoose.model('post', postSchema);

// Export the model
module.exports = ModelClass;
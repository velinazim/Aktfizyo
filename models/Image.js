const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    image_path: String,
    searchText: String,
    status: Boolean
});

module.exports = mongoose.model('images', MovieSchema);
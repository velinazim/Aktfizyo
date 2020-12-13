const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const MovieSchema = new Schema({
    imagePath: String,
    searchText: String,
    imageUrl: String,
    status: Boolean,
});

MovieSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('images', MovieSchema);
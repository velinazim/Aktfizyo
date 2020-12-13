const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const CategorySchema = new Schema({
    imageId: Schema.Types.ObjectId,
    title: String,
    article: String,
    status: Number,
    sortSeq: Number
});

CategorySchema.plugin(mongoosePaginate);

module.exports = mongoose.model('categories', CategorySchema);
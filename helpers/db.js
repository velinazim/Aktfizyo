const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb+srv://admin:admin@cluster0.lmfvz.mongodb.net/aktifizyo?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });

    mongoose.connection.on('open', () =>{
        console.log("MongoDb Bağlandı");
    });
    mongoose.connection.on('error', (err) =>{
        console.log("MongoDb Error", err);
    });

    mongoose.Promise = global.Promise;
}
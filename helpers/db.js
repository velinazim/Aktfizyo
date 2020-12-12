const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb://localhost/Mydb', {
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
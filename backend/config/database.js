const mongoose = require('mongoose');

//Database Connection

const connectDatabase = () => {
    mongoose.connect('mongodb://localhost:27017/EASYHR', {

        //For avoid Warnings
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }).then(con => {
        console.log(`MongoDb Database connect with HOST : ${con.connection.host}`)
    })
}

module.exports = connectDatabase

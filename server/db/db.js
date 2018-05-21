// const { MongoClient, ObjectID } = require('mongodb')

// MongoClient.connect('mongodn://localhost:27017/TodoApp', (err, client) => {
//     if (err)
//         return console.log(err)

//     var db = client.db('TodoApp')
//     console.log('connection succesfull')
// })

const mongoose = require('mongoose')

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp')

module.exports = {
    mongoose
}
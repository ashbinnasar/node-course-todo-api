// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log(err)
    }
    const db = client.db('TodoApp')
    console.log('connection succesfull')

    // db.collection('Todos').deleteOne({ completed: true })
    //     .then(result => {
    //         console.log(result)
    //     })

    // db.collection('Todos').deleteMany({ completed: true })
    //     .then(result => {
    //         console.log(result)
    //     })

    db.collection('Todos').findOneAndDelete({ completed: false })
        .then(result => {
            console.log(result)
        })


    client.close()
})
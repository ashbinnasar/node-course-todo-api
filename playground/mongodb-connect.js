// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log(err)
    }
    const db = client.db('TodoApp')
    console.log('connection succesfull')
    // db.collection('Todos').insertOne({ text: "sometext", completed: false }, (err, result) => {
    //     if (err) {
    //         return console.log(err)
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2))
    // })

    // db.collection('Users').insertOne({ name: "Ashbin", age: 25, location: "Bangalore" }, (err, result) => {
    //     if (err)
    //         console.log(err)

    //     console.log(JSON.stringify(result.ops, undefined, 2))
    // })

    db.collection('Todos').find().count()
        .then(count => {
            console.log('count', count)
        })
        .catch(err => {
            console.log(err)
        })
    // db.collection('Todos').find({ _id: new ObjectID('5b01887a2d0d632aa478e3cf') }).toArray()
    //     .then(docs => {
    //         console.log(JSON.stringify(docs, undefined, 2))
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })


    client.close()
})
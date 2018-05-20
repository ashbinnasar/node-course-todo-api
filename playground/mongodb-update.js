// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log(err)
    }
    const db = client.db('TodoApp')
    console.log('connection succesfull')

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5b018186305c3019141175dc')
    }, {
            $set: {
                name: "nasar"
            },
            $inc: {
                age: 10
            }
        }, {
            returnOriginal: false
        })
        .then(result => {
            console.log(result)
        })


    client.close()
})
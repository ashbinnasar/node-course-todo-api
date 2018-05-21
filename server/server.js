const db = require('./db/db.js')
const { User } = require('./models/user.js')
const { Todo } = require('./models/todo.js')

const express = require('express')
const bodyParser = require('body-parser')
const { ObjectID } = require('mongodb')
const _ = require('lodash')
const port = process.env.PORT || 3000;

var app = express()

app.use(bodyParser.json())

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    })

    todo.save().then(doc => {
        res.send(doc)
    })
        .catch(err => {
            res.status(400).send(err)
        })
})

app.get('/todos', (req, res) => {
    Todo.find({}).then(todos => {
        res.send({
            "todos": todos
        })
    })
        .catch(err => {
            res.status(400).send(err)
        })
})

app.get('/todos/:todoId', (req, res) => {

    if (!ObjectID.isValid(req.params.todoId)) {
        return res.status(400).send()
    }
    Todo.findById(req.params.todoId)
        .then(docs => {
            res.send({ todo: docs })
        })
        .catch(err => {
            res.status(400).send(err)
        })
})

app.delete('/todos/:id', (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send()
    }

    Todo.findByIdAndRemove(req.params.id).then(docs => {
        res.send({ docs })
    })
        .catch(err => {
            res.status(400).send(err)
        })
})

app.patch('/todos/:id', (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send()
    }
    var body = _.pick(req.body, ['text', 'completed'])

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime()
        console.log('boydddd', body)
    } else {
        console.log('xx', body)
        body.completed = false
        body.completedAt = null
    }

    Todo.findByIdAndUpdate(req.params.id, {
        $set:  body 
    },
        { new: true }
    ).then(todo => {
        res.send({ todo })
    })
        .catch(err => {
            res.status(400).send(err)
        })
})

app.listen(port, (err) => {
    if (err)
        return console.log(err)

    console.log(`server is up and running on ${port}`)
})
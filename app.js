const express = require('express');
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient
var mongodb = require('mongodb');
const app = express();
app.use(bodyParser.urlencoded({extended: true}))

var db

MongoClient.connect('mongodb+srv://zakaria:iCkxY3n4Hdseg595@cluster0-wgdlk.mongodb.net/test?retryWrites=true&w=majority', (err, client) => {
  if (err) return console.log(err)
  db = client.db('my_quotes') // whatever your database name is
app.listen(3000, function() {
    console.log('listening on 3000')
  })
})

  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
  })

  app.post('/quotes', (req, res) => {
    db.collection('quotes').save(req.body, (err, result) => {
        if (err) return console.log(err)
    
        res.status(201).send({
            success: 'true',
            message: 'qoute added successfully'
          })
        //res.redirect('/')
      })
  })

  app.get('/quotes', (req, res) => {
    var cursor = db.collection('quotes').find().toArray(function(err, results) {
        //console.log(results)
        res.status(200).send(results)
      })
  })

  app.delete('/quotes/:id', function (req, res) {
    console.log('Request Id:', req.params.id);
    db.collection('quotes', function(err, collection) {
        collection.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
        res.status(200).send(collection)
     });
    
    });
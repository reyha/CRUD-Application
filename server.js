const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.json())

var db
var db_url
var collections

db_url  = 'mongodb://my-app:reyhaapp@ds155577.mlab.com:55577/my-db'
MongoClient.connect(db_url, (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3000, () => {
  console.log('listening on 3000')
  })
})

app.use(bodyParser.urlencoded({extended:true}))

// app.get(path, callback)

app.get('/', (req, res) => {
  db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('index.ejs', {quotes: result})
  })
})

app.post('/quotes', (req,res) => {
   // const myAwesomeDB = database.db('my-app')
   db.collection('quotes').insert(req.body, (err, result) => {
      if (err) return console.log(err)
      console.log("saved to db")
      res.redirect('/')
  })
})

app.put('/quotes', (req, res) => {
  // Handle put request
 db.collection('quotes')
  .findOneAndUpdate({name: 'Yoda'}, {
    $set: {
      name: req.body.name,
      quote: req.body.quote
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.delete('/quotes', (req, res) => {
  // Handle delete event here
  db.collection('quotes').findOneAndDelete({name: req.body.name},
  (err, result) => {
    if (err) return res.send(500, err)
    res.send({message: 'A darth vadar quote got deleted'})
  })
})  


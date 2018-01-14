var db
var db_url
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.json())

db_url  = 'mongodb://my-app:reyhaapp@ds155577.mlab.com:55577/my-db'

MongoClient.connect(db_url, (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3000, () => {
  console.log('listening on 3000')
  })
})

app.use(bodyParser.urlencoded({extended:true}))

app.get('/', (req, res) => {
  db.collection('list').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('index.ejs', {list: result})
  })
})

app.post('/list', (req,res) => {
   db.collection('list').insert(req.body, (err, result) => {
      if (err) return console.log(err)
      console.log("saved to db")
      res.redirect('/')
  })
})

app.put('/list', (req, res) => {
 db.collection('list')
  .findOneAndUpdate({priority: 'High'}, {
    $set: {
      priority: req.body.priority,
      item: req.body.item,
      date: req.body.date
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.delete('/list', (req, res) => {
  db.collection('list').findOneAndDelete({priority: req.body.priority},
  {sort: {_id: -1}},(err, result) => {
    if (err) return res.send(500, err)
    res.send({message: 'Last item deleted!'})
  })
})  


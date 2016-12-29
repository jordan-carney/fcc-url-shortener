const express = require('express')
const MongoClient = require('mongodb').MongoClient
const Shorten = require('./shortenify')
let db
const app = express()

app.set('port', (process.env.PORT || 5000));

MongoClient.connect(process.env.MONGOURL, (err, database) => {
  if (err) return console.log('ERROR: ', err)
  db = database
})

app.listen(app.get('port'), () => {
  console.log('App is running on port:', app.get('port'))
})


// ROUTES
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.get('/smash/*', (req, res) => {
  const longUrl = req.url.slice(7)
  if ( longUrl.startsWith('http://') || longUrl.startsWith('https://') ) {
    if ( longUrl.includes('.') ) {
      Shorten.generateShortUrl(db, (err, short) => {

        let shortId = short

        const data = {
          shortUrl: req.protocol + '://' + req.hostname + '/' + shortId,
          longUrl: longUrl,
          shortId: shortId,
        }
            db.collection('urls').save(data, (err, result) => {
              if (err) return console.log(err)
              delete data._id
              res.json(data)
            })
      })
    } else {
      res.send('The submitted URL doesn\'t look quite right. Please ensure you included a valid domain.')
    }
  } else {
  res.send('The submitted URL doesn\'t look quite right. Please include http:// or https:// protocols.')
  }
})

app.get('/:shorty', (req, res) => {
  db.collection('urls').findOne({ shortId: req.params.shorty }, (err, results) => {
    if (err) res.send(err)
    if (results) {
      res.redirect(301, results.longUrl)
    } else {
      res.send('Sorry, that short URL was not found.')
    }
  })
})

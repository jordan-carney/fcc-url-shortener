module.exports = {
    generateShortUrl: function(db, callback) {

        db.collection('urls').find({},{shortId:true}).toArray( (err, results) => {
          if (err) res.send(err)
          let existingShortUrl = results.map( val => val.shortId )

          let short = getRandom()

          while (short.length !== 5 && existingShortUrl.some( val === short ) ) {
              short = getRandom()
          }

          callback(err, short)
        })

        function getRandom() {
            return Math.random().toString(36).slice(2, 7)
        }
    }
}

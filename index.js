var nconf = require('nconf')
var throttle = require('lodash.throttle')
var bodyParser = require('body-parser')
var dataUriToBuffer = require('data-uri-to-buffer')
var express = require('express')
var twitterAPI = require('node-twitter-api')
var app = express()
nconf.argv().env().file({ file: 'local.json'})
// Rate limit variable.
var available = true

var twitter = new twitterAPI({
  consumerKey: nconf.get('consumerKey'),
  consumerSecret: nconf.get('consumerSecret'),
  callback: ''
})

app.use(bodyParser.json({limit: '2mb'}))
app.use(express.static(__dirname + '/public'))

app.get('/', function(req, res) {
  if (available) {
    res.status(200).end()
  }
  res.status(420).end()
})

var twitterPost = throttle(function (img) {
  available = true
  var payload = {
    media: [img],
    status: ''
  }
  twitter.statuses('update_with_media', payload, nconf.get('accessKey'), nconf.get('accessSecret'), function(err, data) {
    if (err) {
      console.log(err)
    }
  })
}, false, false)

app.post('/service', function(req, res) {
  var imgBuff = dataUriToBuffer(req.body.content.data)
  available = false
  twitterPost(imgBuff)
  res.json(req.body)
})

var port = nconf.get('port')
app.listen(port)
console.log('server running on port: ', port)

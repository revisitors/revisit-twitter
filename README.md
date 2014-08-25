#Revisit Twitter Servrice
This little project provides a single enpoint that posts an image to twitter.

##Installation:
 - `npm install -g nodemon`
 - `npm install`
 - `cp local.json-dist local.json`
 - fill out twitter creds in local.json

##Usage:
 - `npm start`

The API provides a single `/service` endpoint to POST an image to, which
does a noop, posts the image to Twitter, and then resonds with the passed image.

By default the app runs on port 8000, this can be configred in local.json.

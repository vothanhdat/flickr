

const compression = require('compression')
const proxy = require('express-http-proxy')
const express = require('express')
const mime = require('mime-types')
const fallback = require('connect-history-api-fallback')

const app = express()

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// compress all requests
app.use(compression())

// app.use statements from here on are compressed
// as long as the client requests compression and the
// response is > 1kb
app.use(fallback())

// serve static files
app.use(express.static(__dirname + '/build', {
  maxAge: "1y",
  setHeaders: function (res, path) {
    if (mime.lookup(path) === 'text/html' || path.endsWith('\sw.js')) {
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0')
      res.setHeader('Pragma', 'no-cache')
    }
  },
}))

app.use('/api', proxy('https://gift-backend.herokuapp.com/', {
  memoizeHost: false,
  limit: "120mb",
  https: true,
  // proxyReqPathResolver: function(req) {
  //   return '/uploads'+ require('url').parse(req.url).path;
  // }
}));

// listen
app.listen(parseInt(process.env.PORT, 10) || 80)

console.log('Static server started')
console.log(`Port ${parseInt(process.env.PORT, 10) || 80}`)

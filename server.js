//Connect Db
require('dotenv').config()
require('./utils/MongoConnection')
// Use local variable enviroment
const path = require('path')
const fs = require('fs')
const https = require('https')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const compression = require('compression');
const pem = require('pem');
const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const express = require('express')
const next = require('next')
const app = next({ dev, port })
const handle = app.getRequestHandler()
const server = express()

const { key, cert } = (() => {
  try {
    return {
      key: fs.readFileSync(`./cert/rabbitworld.ddns.net/privkey.pem`),
      cert: fs.readFileSync(`./cert/rabbitworld.ddns.net/fullchain.pem`)
    }
  } catch (e) {
    return new Promise((res, rej) => {
      pem.createCertificate({ days: 1, selfSigned: true }, function (err, keys) {
        if (err) {
          rej();
        } else {
          res({ key: keys.serviceKey, cert: keys.certificate });
        }
      });
    });
  }
})();

const httpsServer = https.createServer({ key, cert }, server).listen(443)

server.use(function (request, response, next) {

  if (process.env.NODE_ENV != 'development' && !request.secure && request.headers.host != 'localhost:3000') {
    return response.redirect("https://" + request.headers.host.replace(/\:.*/, '') + request.url);
  }
  next();
})

var allowlist = ['http://192.168.2.179:3000', 'http://rabbitworld.ddns.net']
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header('origin')) !== -1) {
    corsOptions = {
      origin: true,
      credentials: true
    } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}


server.use(cors(corsOptionsDelegate))
server.use(morgan('dev'))
server.use(cookieParser())
server.use('/images', express.static(path.join(__dirname, 'public', 'images')))
server.use("/.well-known/acme-challenge", express.static("letsencrypt/.well-known/acme-challenge"));

server.use(compression())

// server.use((req, res, next) => {
//   console.log(req)
//   if (req.header('referer') === 'http://192.168.2.179:3000/')
//     next()
//   else return res.json({ message: '403 forbidden' })
// })




const userRoutes = require('./api/user.routes')
const postRoutes = require('./api/post.routes')
server.use('/api/user', userRoutes)
server.use('/api/post', postRoutes)

app.prepare().then(() => {
  server.get('/', (req, res) => {
    return app.render(req, res, '/')
  })
  server.get('/about', (req, res) => {
    return app.render(req, res, '/about')
  })
  server.get('/contact', (req, res) => {
    return app.render(req, res, '/contact')
  })

  server.get('/post', (req, res) => {
    return app.render(req, res, `/post`)
  })

  server.get('/post/:slug', (req, res) => {
    return app.render(req, res, `/post/${req.params.slug}`)
  })

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`Server listening on the port::${port}`);
  })
})

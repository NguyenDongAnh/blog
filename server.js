// Use local variable enviroment
require('dotenv').config()
//Connect Db
require('./libs/MongoConnection')
const path = require('path')
const fs = require('fs')
const https = require('https')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const favicon = require('serve-favicon')
const compression = require('compression')
const pem = require('pem')
const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const express = require('express')
const next = require('next')
const app = next({ dev, port })
const handle = app.getRequestHandler()
const server = express()

server.use(function (request, response, next) {
	if (
		process.env.NODE_ENV != 'development' &&
		!request.secure &&
		request.headers.host != 'localhost:3000'
	) {
		return response.redirect(
			'https://' + request.headers.host + request.url
		)
	}
	next()
})

var allowlist = [
	'http://192.168.2.179:3000',
	'http://rabbitworld.ddns.net',
	'https://www.googletagmanager.com',
	'https://www.google-analytics.com'
]
var corsOptionsDelegate = function (req, callback) {
	var corsOptions
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
server.use(morgan('common'))
server.use(cookieParser())
server.use(express.json())
server.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
server.use('/images', express.static(path.join(__dirname, 'public', 'images')))
server.use(
	'/.well-known/acme-challenge',
	express.static('letsencrypt/.well-known/acme-challenge')
)
server.use(compression())

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

	server.all('/_next/webpack-hmr', (req, res) => {
		handle(req, res)
	})

	server.all('*', (req, res) => {
		return handle(req, res)
	})

	server.listen(port, err => {
		if (err) throw err
		console.log(`Server listening on the port::${port}`)
	})
})

const { key, cert } = (() => {
	try {
		return {
			key: fs.readFileSync(`./cert/rabbitworld.ddns.net/privkey.pem`),
			cert: fs.readFileSync(`./cert/rabbitworld.ddns.net/fullchain.pem`)
		}
	} catch (e) {
		return new Promise((res, rej) => {
			pem.createCertificate(
				{ days: 1, selfSigned: true },
				function (err, keys) {
					if (err) {
						rej()
					} else {
						res({ key: keys.serviceKey, cert: keys.certificate })
					}
				}
			)
		})
	}
})()

const httpsServer = https.createServer({ key, cert }, server).listen(443)

const io = require('./libs/SocketIO')(httpsServer)
io.on('connection', socket => {
	console.log(socket.id)
})

io.on('disconnect', socket => {
	console.log(disconnect, socket.connected)
})

io.engine.on('connection_error', err => {
	console.log(err.req) // the request object
	console.log(err.code) // the error code, for example 1
	console.log(err.message) // the error message, for example "Session ID unknown"
	console.log(err.context) // some additional error context
})

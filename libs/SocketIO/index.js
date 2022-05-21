const { Server } = require('socket.io')

module.exports = function (httpsServer) {
	return new Server(httpsServer, {})
}

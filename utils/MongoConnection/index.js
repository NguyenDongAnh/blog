const mongoose = require("mongoose")
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/blog?compressors=zlib'

if (!MONGODB_URI) {
    console.log(MONGODB_URI)
    throw new Error(
        'Please define the MONGODB_URI environment variable inside .env'
    )
}

opts = {
    useNewUrlParser: true,
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
}

const connection = mongoose.connect(MONGODB_URI, opts, (err, db) => {
    if (!err) console.log("Connected!")
    else console.log(err.message)
})

require("../../models/User")
require("../../models/Post")
require("../../models/Comment")

module.exports = connection
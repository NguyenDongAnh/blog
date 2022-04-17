const mongoose = require('mongoose')

const TagSchema = mongoose.Schema({
    nameTag: {
        type: String,
        unique: true
    }
})

module.exports = mongoose.models.Tag || mongoose.model('Tag', TagSchema)
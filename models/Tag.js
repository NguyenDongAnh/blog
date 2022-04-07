const mongoose = require('mongoose')

const TagSchema = mongoose.Schema({
    nameTag: {
        type: String
    }
})

module.exports = mongoose.models.Tag || mongoose.model('Tag', TagSchema)
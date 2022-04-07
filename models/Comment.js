const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    content: {
        type: String
    },
    rely: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    },
}, { timestamps: true })

module.exports = mongoose.models.Comment || mongoose.model('Comment', CommentSchema)
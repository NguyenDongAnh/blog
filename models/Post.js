const slugify = require('slugify')
const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        default: function () {
            if (this.title) {
                return slugify(this.title).toLowerCase();
            }
            return null;
        }
    },
    transliterated: {
        type: String
    },
    url: {
        type: String,
        default: function () {
            if (this.slug) {
                return `https://rabbitworld.ddns.net/blog/${this.slug}`;
            }
            return null;
        }
    },
    published_at: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String
    },
    thumnail: {
        type: String
    },
    content: {
        type: String
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    dislikes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    comment: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    views: {
        type: Number
    },
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag'
    }]
}, { timestamps: true })

module.exports = mongoose.models.Post || mongoose.model('Post', PostSchema)
const slugify = require('slugify')
const mongoose = require('mongoose')
// const { generateString } = require('utils')

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateString(length) {
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        default: function () {
            return generateString(6)
        }
    },
    transliterated: {
        type: String,
        default: function () {
            if (this.title) {
                return slugify(this.title).toLowerCase();
            }
            return null;
        }
    },
    url: {
        type: String,
        default: function () {
            if (this.transliterated) {
                return `/blog/${this.transliterated}-${this.slug}`;
            }
            return null;
        }
    },
    content: {
        type: String
    },
    description: {
        type: String,
        default: function () {
            if (this.content.length > 397) {
                return this.content.substring(1, 397) + '...'
            }
            return this.content
        }
    },
    published_at: {
        type: Date,
        default: Date.now
    },
    time_reading: {
        type: Number,
        default: function () {
            if (this.content) {
                return Math.round(this.content.length / 820) * 60 * 1000;
            }
            return 0
        }
    },
    thumnail: {
        type: String,
        default: '/images/rabbit.png'
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
        type: Number,
        default: 0
    },
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag'
    }]
}, { timestamps: true })

module.exports = mongoose.models.Post || mongoose.model('Post', PostSchema)
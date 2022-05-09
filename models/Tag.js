const mongoose = require('mongoose')

const TagSchema = mongoose.Schema({
    slug: {
        type: String,
        default: function () {
            if (this.title) {
                return slugify(this.name_tag).toLowerCase();
            }
            return null;
        }
    },
    name_tag: {
        type: String,
        unique: true
    }
})

module.exports = mongoose.models.Tag || mongoose.model('Tag', TagSchema)
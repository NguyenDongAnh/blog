const mongoose = require('mongoose')

const SiteMapSchema = new mongoose.Schema({
    url: {
        type: String
    }
}, { timestamps: true })

module.exports = mongoose.models.Comment || mongoose.model('SiteMap', SiteMapSchema)
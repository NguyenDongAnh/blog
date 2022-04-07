const express = require('express')
const router = express.Router()
const { createPost, findPostBySlug } = require('../controllers/posts.controller')

router.post('/create', (req, res) => {
    return createPost(req, res)
})

router.get('/:slug', (req, res) => {
    return findPostBySlug(req, res)
})

module.exports = router
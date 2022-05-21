const express = require('express')
const router = express.Router()
const {
	createPost,
	findPostBySlug,
	findManyPostInSlugArray
} = require('../controllers/posts.controller')

router.post('/create', (req, res) => {
	return createPost(req, res)
})

router.post('/stored', (req, res) => {
	return findManyPostInSlugArray(req, res)
})

module.exports = router

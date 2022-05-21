const express = require('express')
const router = express.Router()
const { register } = require('../controllers/user.controller')

router.post('/register', (req, res) => {
	return register(req, res)
})
router.post('/register', (req, res) => {
	return register(req, res)
})

module.exports = router

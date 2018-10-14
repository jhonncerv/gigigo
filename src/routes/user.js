const express = require('express')
const router = express.Router()

const UserController = require('../controllers/user-controller')

router.get('/', UserController.user_fetch_all)

router.get('/:id', UserController.user_fetch_by_id)

router.post('/', UserController.user_create)

router.put('/:id', UserController.user_update)

router.delete('/:id', UserController.user_delete)

module.exports = router
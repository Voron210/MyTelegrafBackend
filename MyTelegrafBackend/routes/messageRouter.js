const Router = require('express')
const router = new Router()
const messageController = require('../controllers/messageController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', authMiddleware, messageController.create)
router.delete('/', authMiddleware, messageController.delete)
router.post('/id', authMiddleware, messageController.getAll)

module.exports = router
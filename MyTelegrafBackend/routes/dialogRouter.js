const Router = require('express')
const router = new Router()
const dialogController = require('../controllers/dialogController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/',authMiddleware, dialogController.create)
router.delete('/',authMiddleware, dialogController.delete)
router.get('/',authMiddleware, dialogController.getAll)

module.exports = router
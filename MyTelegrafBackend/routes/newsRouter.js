const Router = require('express')
const router = new Router()
const newsController = require('../controllers/newsController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', authMiddleware, newsController.create)
router.delete('/', authMiddleware, newsController.delete)
router.get('/', authMiddleware, newsController.getAll)

module.exports = router
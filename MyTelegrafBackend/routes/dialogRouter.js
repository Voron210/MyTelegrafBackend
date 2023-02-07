const Router = require('express')
const router = new Router()
const dialogController = require('../controllers/dialogController')

router.post('/',dialogController.create)
router.get('/',dialogController.getAll)

module.exports = router
const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const dialogRouter = require('./dialogRouter')
const messageRouter = require('./messageRouter')
const newsRouter = require('./newsRouter')


router.use('/user', userRouter)
router.use('/dialog', dialogRouter)
router.use('/message', messageRouter)
router.use('/news', newsRouter)

module.exports = router
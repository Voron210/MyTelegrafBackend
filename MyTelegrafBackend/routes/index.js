const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const dialogRouter = require('./dialogRouter')
const messageRouter = require('./messageRouter')


router.use('/user', userRouter)
router.use('/dialog', dialogRouter)
router.use('/message', messageRouter)

module.exports = router
const ApiError = require('../error/apiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User } = require('../models/models')

const generateJwt = (id, email, role, nickname) => {
    return jwt.sign(
        { id, email, role, nickname },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    )
}

class UserController {
    async registrarion(req, res, next) {
        const { email, password, role, nickname } = req.body
        if (!email || !password || !nickname) {
            return next(ApiError.badRequest('Missing required fields'))
        }
        const existEmail = await User.findOne({ where: { email } })
        const existNick = await User.findOne({ where: { nickname } })
        if (existEmail) {
            return next(ApiError.badRequest('Email already exists'))
        }
        if (existNick) {
            return next(ApiError.badRequest('Nickname already exists'))
        }
        const hashPassword = await bcrypt.hash(password,5)
        const user = await User.create({ email, role, password: hashPassword,nickname})
        const token = generateJwt(user.id, user.email, user.nickname, user.role)
        return res.json({token})
    }

    async login(req, res, next) {
        const { email, password } = req.body
        const user = await User.findOne({ where: { email } })
        if (!user) {
            return next(ApiError.badRequest('User not found'))
        }
        let comparePassword = bcrypt.compare(password, user.password)
        if (!comparePassword) {
            return next(ApiError.badRequest('Incorrect password'))
        }
        const token = generateJwt(user.id, user.email, user.role, user.nickname)
        return res.json({token})
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role, req.user.nickname)
        return res.json({token})
    }
}

module.exports = new UserController()
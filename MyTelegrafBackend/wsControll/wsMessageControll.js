const ApiError = require('../error/apiError')
const { Message } = require('../models/models')

class MessageController {
    async create(req) {
        try {
            const message = await Message.create({ message: req.message, userId: req.userId, dialogId: req.dialogId })
            return message
        } catch (e) {
            //return status(400).json({ error: 'Bad Request' });
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.body
            if (!id) {
                return next(ApiError.badRequest('Не передан id диалога'))
            }
            const existMessage = await Message.findOne({ where: { id } })
            if (req.user.role == "Admin" || existMessage.userId == req.user.id) {
                const message = await existMessage.destroy()
                return res.json(message)
            }

        } catch (e) {
            return next(ApiError.badRequest('Bad Delete :D'))
        }
    }

    async getAll(req, res, next) {
        try {
            const message = await Message.findAll({ where: { userId: req.user.id, dialogId: req.body.dialogId } })
            return res.json(message)
        } catch (e) {
            return next(ApiError.badRequest('Bad getAll :D'))
        }
    }
}

module.exports = new MessageController()
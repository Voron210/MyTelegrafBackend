const { Dialog } = require('../models/models')
const ApiError = require('../error/apiError')

class DialogController {

    async create(req, res, next) {
        try {
            const dialog = await Dialog.create({ name: req.body.name, userId: req.user.id })
            return res.json(dialog)
        } catch (e) {
            return next(ApiError.badRequest('Bad Create :D'))
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.body
            if (!id) {
                return next(ApiError.badRequest('Íå ïåðåäàí id äèàëîãà'))
            }
            const existDialog = await Dialog.findOne({ where: { id } })
            if (!existDialog) {
                return next(ApiError.badRequest('Dialog with the given id does not exist'))
            }
            if (req.user.role == "Admin" || existDialog.userId == req.user.id) {
                const dialog = await existDialog.destroy()
                return res.json(dialog)
            } else {
                return next(ApiError.forbidden('You do not have the permissions to delete this dialog'))
            }
            
        } catch (e) {
            return next(ApiError.badRequest('Bad Delete :D'))
        }
    }

    async getAll(req, res, next) {
        try {
            const dialogs = await Dialog.findAll({ where: { userId: req.user.id } })
            return res.json(dialogs)
        } catch (e) {
            return next(ApiError.badRequest('Bad getAll :D'))
        }
    }
}

module.exports = new DialogController()

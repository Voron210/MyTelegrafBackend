const { Dialog } = require('../models/models')
const ApieError = require('../error/apiError')

class DialogController {
    async create(req, res) {
        const { name, creator } = req.body
        const dialog = await Dialog.create({ name, creator })
        return res.json(dialog)
    }

    async delete(req, res) {

    }

    async getAll(req, res) {
        const dialogs = await Dialog.findAll()
        return res.json(dialogs)
    }
}

module.exports = new DialogController()
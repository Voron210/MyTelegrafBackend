const { News } = require('../models/models')
const ApiError = require('../error/apiError')

class NewsController {

    async create(req, res, next) {
        try {
            const news = await News.create({ name: req.body.name, content: req.body.content })
            return res.json(news)
        } catch (e) {
            return next(ApiError.badRequest('Bad Create :D'))
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.body
            if (!id) {
                return next(ApiError.badRequest('Send id'))
            }
            const existNews = await News.findOne({ where: { id } })
            if (!existNews) {
                return next(ApiError.badRequest('News with the given id does not exist'))
            }
            if (req.user.role == "Admin") {
                const News = await existNews.destroy()
                return res.json(News)
            } else {
                return next(ApiError.forbidden('You do not have the permissions to delete this News'))
            }

        } catch (e) {
            return next(ApiError.badRequest('Bad Delete :D'))
        }
    }

    async getAll(req, res, next) {
        try {
            const news = await News.findAll({
                order: [['updatedAt', 'DESC']]
            })
            return res.json(news)
        } catch (e) {
            return next(ApiError.badRequest('Bad getAll :D'))
        }
    }
}

module.exports = new NewsController()

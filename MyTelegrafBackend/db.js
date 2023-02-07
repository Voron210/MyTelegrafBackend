const { Sequelize } = require('sequelize')

module.exports = new Sequelize(
    process.env.DB_NAME, //BD Name
    process.env.DB_USER, //User name
    process.env.DB_PASSWORD, // Pasword
    {
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT
    }
)
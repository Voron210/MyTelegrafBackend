require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const PORT = process.env.PORT //1488
const cors = require('cors')
const router = require('./routes/index')

const errorHandler = require('./middleware/errorHandlingMiddleware')

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', router)

app.get('/', (req,res) => {
    res.status(200).json({message:'WOOOORKONG!!!'})
})

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log('Server started on port ${1488}'))
    } catch (e) {
        console.log(e)
    }
}
                         
start()
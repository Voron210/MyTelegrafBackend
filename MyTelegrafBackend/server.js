require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const PORT = process.env.PORT //1488
const cors = require('cors')
const helmet = require('helmet');

const router = require('./routes/index')

const errorHandler = require('./middleware/errorHandlingMiddleware')

const app = express()
app.use(helmet());
//app.use(cors())
app.use(express.json())
app.use('/api', router)

app.get('/', (req,res) => {
    res.status(200).json({message:'WOOOORKONG!!!'})
})

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}
                         
start()
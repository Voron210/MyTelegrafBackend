require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const PORT = process.env.PORT //1488
const cors = require('cors')
const helmet = require('helmet')

const router = require('./routes/index')


const errorHandler = require('./middleware/errorHandlingMiddleware')
const wsControll = require('./wsController')
const { Connection } = require('pg')

const app = express()
const WSServer = require('express-ws')(app)
const aWss = WSServer.getWss().clients

const corsOptions = {
    origin: 'http://localhost:8080',
}

app.use(helmet());
app.use(cors(corsOptions))
app.use(express.json())
app.use('/api', router)

app.ws('/api', (ws) => {
    ws.send('You are connected')
    ws.on('message', (msg) => {
        wsControll.onMessage(ws,msg,aWss)
    })
})

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
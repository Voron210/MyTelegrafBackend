const { Message } = require("./models/models")
const wsMessageControll = require("./wsControll/wsMessageControll")


class wsController {

    /*constructor() {
        
    }*/
    async broadcastConnection(ws, aWss) {
        ws.send('123')
        aWss.forEach(client => {
            client.send('Somebody connected')
        })
    }

    async connectionhandler(ws, data, aWss) {
        ws.send('You connected')
        this.broadcastConnection(ws,aWss)
    }

    async messageHandler(ws, data) {
        ws.send('Message receive')
        const message = await Message.create({ message: data.content, userId: data.id, dialogId: data.dialogId })

    }

    async onMessage(ws, msg, aWss) {
        try {
            // Parse the incoming message as a JSON object
            const data = JSON.parse(msg)
            // Determine the method requested by the client
            switch (data.method) {
                case 'connection':
                    // Handle connection request
                    await this.connectionhandler(ws, data, aWss)
                    break
                case 'message':
                    // Handle message request
                    await this.messageHandler(ws, data)
                    break
                default:
                    // Handle invalid request method
                    console.error(`Invalid method: ${data.method}`)
                    break
            }
        } catch (error) {
            console.error(`Error processing message: ${msg}`)
            console.error(error)
        }
    }

}

module.exports = new wsController()

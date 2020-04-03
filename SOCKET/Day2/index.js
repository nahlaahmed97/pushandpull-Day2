const cors = require ('cors')
const socketio = require ('socket.io')
const app = require ('express')();
// socket io requires http
const server = require ('http').Server(app)

app.use(cors())
const io = socketio(server)

io.on('connection', (client) => {
    client.on('message', (message) => {
        console.log(message);
     
        //Send the Message to all clients
        io.emit('new-message', message);
    });
});


server.listen(3000, ()=>{
    console.log('server is listening on port 3000')
})

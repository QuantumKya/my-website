const ws = require('ws');
const server = new ws.Server({ port: '3000' });

server.on('connection', socket => {
    socket.on('message', msg => {
        console.log("YAP YAP YAP");
        socket.send(`${msg}`);
    })
});
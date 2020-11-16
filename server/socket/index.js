
module.exports = function(server){ 
    const { fromFile } = require('../routes/solar');

    const io = require('socket.io')(server, {
        path: '/realtime',
        transport: ['websocket'],
        cors: true
    });

    io.on('connection', socket => {
        socket.send('Hello World!');    
        console.log('Hello World');
              
        socket.on('join', (name, solarId) => {
          console.log(`${name} has joined`);
          socket.join(solarId);
        });        
    });   
    
    //Emit technician data on a loop        
    setInterval(async() => {
        let data = await fromFile();
        console.log(JSON.stringify(data));
        io.emit('tech', data);
    }, 5000);
    
    return io;
}



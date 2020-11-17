
module.exports = function(server){ 
    const { fromFile } = require('../routes/solar');
    const turf = require('@turf/turf');

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
        //console.log(JSON.stringify(data));        
        io.emit('tech', data);    

        //Find the distance from each point to each other point and notify if one of more are within 1000 feet.
        let proximityAlerts = [];
        try{        
            for ( let x=0; x < data.features.length; x++){
                //For each element in array compare it with all elements after it.
                for ( let y=x+1; y < data.features.length; y++){
                    let nameX = data.features[x].properties.name;
                    let nameY = data.features[y].properties.name;
                    let dist = turf.distance(data.features[x], data.features[y], {units: 'feet'});
                    console.log(`Comparing ${nameX} to ${nameY} : ${dist} Feet`);
                    if(dist <= 1000){        
                        let newAlert = { message: "Proximity Alert", technicians: [nameX, nameY], distance: dist };     
                        console.log(newAlert);   
                        proximityAlerts.push(newAlert);
                    }
                }
            }
            if(proximityAlerts.length > 0){
                io.emit('notify', proximityAlerts[0]); //Front end only supports one notification at a time fine for this usecase at the moment.
            }
        } catch(e){
            console.error(e);
        }
    }, 5000);
    
    return io;
}



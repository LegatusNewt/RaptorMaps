import Map from './Map/Map.js';
import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import Alert from '@material-ui/lab/Alert';
import Collpase from '@material-ui/core/Collapse';
import appStyle from './App.css'; 
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { server_url } from './config.js';

function App() {
    //Starting data
    let exJSON = JSON.parse('{ "type": "FeatureCollection", "features": [ { "type": "Feature", "properties": { "id": 0, "name": "Tech 3", "tsecs": 1592078400, "bearing": 0 }, "geometry": { "type": "Point", "coordinates": [ -115.60639190059982, 32.67369394339296 ] } }, { "type": "Feature", "properties": { "id": 0, "name": "Tech 1", "bearing": 87, "tsecs": 1592078400 }, "geometry": { "type": "Point", "coordinates": [ -115.58590807376797, 32.67908364196443 ] } }, { "type": "Feature", "properties": { "id": 0, "name": "Tech 2", "bearing": 270, "tsecs": 1592078400 }, "geometry": { "type": "Point", "coordinates": [ -115.59087670213857, 32.67656712829319 ] } } ] }');

    //state
    const [geoJSON, setGeoJSON] = useState(exJSON);
    const [notify, setNotify] = useState({message: "Proximity Alert", distance: 0, technicians: []});
    const [open, setOpen] = useState(false);
    let timer = null;

    //Setup the socketIOClient on mounted
    useEffect(() => {
        //Connect to LAN address/port running the backend
        const socket = socketIOClient(server_url, {
            path: '/realtime'
        });
        socket.on("tech", data => {
            let newGeoJSON = { type: "FeatureCollection", features: data.features };
            setGeoJSON(newGeoJSON);  
        });
        socket.on("notify", data => {
            clearTimeout(timer);
            setNotify(data);
            setOpen(true);
            let newTimer = setTimeout(function() {
                setOpen(false);
            }, 5000);
            timer = newTimer;
        });
    }, []);

    const notifyStyle = {
        position: 'absolute',
        right: '2rem',
        bottom: '2rem',
        width: '25rem'
    }

    //The top level!!
    return (
        <div>           
            <Map data = { geoJSON }></Map>    
            <div className='notify-style'>                
                {
                    <Collpase in={open}>
                        <Alert 
                            action={
                                <IconButton onClick={ () => {
                                    setOpen(false);
                                    console.log('Close Notification');
                                }}>
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }                        
                            severity="info">{`${notify.message} ${notify.technicians.join(',')} ${Math.round(notify.distance)} Feet`} </Alert> 
                    </Collpase>
                }                       
            </div>
        </div>
    );
}

export default App;
import React, { useRef, useEffect, useState} from 'react';
import mapboxgl from 'mapbox-gl';
import socketIOClient from 'socket.io-client';
import './Map.css';

mapboxgl.accessToken = 'pk.eyJ1Ijoia2xhbWFyY2EiLCJhIjoiY2p5a3plOTY0MDMydDNpbzNsMDQ3ZWV2cyJ9.EA8hlPf4fj0wLkT0J0ozkA';

const Map = () => {
    let exJSON = JSON.parse('{ "type": "FeatureCollection", "features": [ { "type": "Feature", "properties": { "id": 0, "name": "Tech 3", "tsecs": 1592078400, "bearing": 0 }, "geometry": { "type": "Point", "coordinates": [ -115.60639190059982, 32.67369394339296 ] } }, { "type": "Feature", "properties": { "id": 0, "name": "Tech 1", "bearing": 87, "tsecs": 1592078400 }, "geometry": { "type": "Point", "coordinates": [ -115.58590807376797, 32.67908364196443 ] } }, { "type": "Feature", "properties": { "id": 0, "name": "Tech 2", "bearing": 270, "tsecs": 1592078400 }, "geometry": { "type": "Point", "coordinates": [ -115.59087670213857, 32.67656712829319 ] } } ] }');
    const mapContainer = useRef();
    const [geojson, setGeoJson] = useState(exJSON);    

    useEffect(() => {
        const map = new mapboxgl.Map({
          container: mapContainer.current,
          style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
          center: [0, 0],
          zoom: 5
        });

        map.on('load', () => {
            map.addSource('points', {            
                type : 'geojson',
                data : geojson
            });

            map.addLayer({
                'id': 'technicians',
                'type': 'circle',
                'source': 'points'
            });
        });

        // Clean up on unmount
        return () => map.remove();   
    }, []);    

    return (
        <div>
            <div ref={mapContainer} className="map-container" />
        </div>
    );
};

export default Map;

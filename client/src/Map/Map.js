import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import './Map.css';
import { MAPBOX_TOKEN } from '../config.js';

mapboxgl.accessToken = MAPBOX_TOKEN;

const Map = ({ data }) => {
    const mapContainer = useRef();
    const [geoJSON, setGeoJSON] = useState(data);    
    const [mapState, setMap] = useState(null);
    const [loaded, isLoaded] = useState(false);

    //Load mapboxgl after "component" mounted
    useEffect(() => {     
        //Set center to be one of the points
        let center = [geoJSON.features[0].geometry.coordinates[0], geoJSON.features[0].geometry.coordinates[1]];
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/satellite-v9", // stylesheet location
            center: center,
            zoom: 15
        });

        map.on('load', () => {
            map.loadImage('./man2x_18dp.png', function (error, image) {
                if (error) throw error;
                map.addImage('man', image, {
                    sdf: "true"
                });
                map.addLayer({
                    'id': 'technicians',
                    'type': 'symbol',
                    'source': {
                        'type': 'geojson',
                        'data': geoJSON
                    },
                    'layout': {
                        'text-field': ['get', 'name'],
                        'text-variable-anchor': ['top', 'bottom', 'left', 'right'],
                        'text-radial-offset': 1,
                        'text-justify': 'auto',
                        'icon-image': 'man'
                    },
                    'paint' : {
                        "icon-color": "#FFFFFF",
                        "text-color": "#FFFFFF"
                    }
                });
                //Helps to alleviate race condition that data is updated before Map loaded
                setMap(map);               
            });
        });
        // Clean up on unmount
        return () => map.remove();
    }, []);

    //Update Mapbox layer when data changes (on socket message)
    useEffect(() => {
        setGeoJSON(data);
        //Call Mapbox function to add data to source of layer
        console.log('Locations updated', data);
        if(mapState && mapState.isStyleLoaded()){
            mapState.getSource('technicians').setData(geoJSON);
        } else{
            console.log('Not Loaded');
        }        
    }, [data]);

    //return Map container as component
    return (
        <div>
            <div ref={mapContainer} className="map-container" />
        </div>
    );
};

export default Map;

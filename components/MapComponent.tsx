"use client"
import React, { useEffect, useState, useRef } from 'react';
import 'ol/ol.css'; // Import OpenLayers CSS
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat, toLonLat } from 'ol/proj';
import { Draw } from 'ol/interaction';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import Style from 'ol/style/Style';
import Circle from 'ol/style/Circle'; // Import Circle
import Fill from 'ol/style/Fill'; // Import Fill
import Stroke from 'ol/style/Stroke'; // Import Stroke
import Icon from 'ol/style/Icon';


const MapComponent: React.FC = () => {
    // State variables to hold map, marker coordinates, and vector source
    const [map, setMap] = useState<Map | null>(null);
    const [markerCoordinates, setMarkerCoordinates] = useState<number[] | null>(null);
    const [vectorSource, setVectorSource] = useState<VectorSource | null>(null);

    // Create a ref for the map
    const mapRef = useRef<Map | null>(null);

    useEffect(() => {
        // Convert coordinates to the format expected by OpenLayers
        const colomboCoordinates = fromLonLat([79.9585, 6.9271]);

        // Create the initial map
        const initialMap = new Map({
            target: 'map',
            layers: [
                // Add a base layer with OpenStreetMap tiles
                new TileLayer({
                    source: new OSM(),
                }),
            ],
            view: new View({
                center: colomboCoordinates,
                zoom: 14,
            }),
        });

        // Store the map in the state and ref
        setMap(initialMap);
        mapRef.current = initialMap;

        // Create a vector source to hold map features (markers)
        const vectorSource = new VectorSource();
        const initialVectorLayer = new VectorLayer({
            source: vectorSource,
            // Define the style for features (default marker)
            style: new Style({
                image: new Circle({
                    radius: 10,
                    fill: new Fill({
                        color: '#FF5733', 
                    }),
                    stroke: new Stroke({
                        color: '#000000',
                        width: 2,
                    }),
                }),
            }),
        });

        // Add the vector layer to the map
        initialMap.addLayer(initialVectorLayer);

        // Store the vector source in the state
        setVectorSource(vectorSource);

        // Create a draw interaction for adding point features (markers)
        const drawInteraction = new Draw({
            source: vectorSource,
            type: 'Point',
        });

        // Event handler when drawing is completed
        drawInteraction.on('drawend', (event: any) => {
            console.log('drawInteraction is executed');
            // Get the coordinates of the drawn feature
            const coordinates = event.feature.getGeometry().getCoordinates();
            // Convert coordinates back to the original format
            setMarkerCoordinates(toLonLat(coordinates));
            // Clear previous features
            vectorSource.clear();
        });

        // Add the draw interaction to the map
        initialMap.addInteraction(drawInteraction);
    }, []); 

    return (
        <div>
            <div id="map" style={{ width: '100%', height: '400px' }}></div>
            {markerCoordinates && (
                <div>
                    <p>Marker Coordinates: {markerCoordinates.join(', ')}</p>
                </div>
            )}
        </div>
    );
};

export default MapComponent;

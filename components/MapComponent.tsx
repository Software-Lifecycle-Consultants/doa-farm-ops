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
import { Box, Grid } from '@mui/material';
import Polygon from 'ol/geom/Polygon';

interface  MarkerCoordinates  {
    setMarkerCoordinates: (markerCoordinates: number[]|null) => void
    setPolygonCoordinates: (polygonCoordinates: number[][][]) => void
    drawType: 'Point' | 'Polygon'
}

const MapComponent: React.FC<MarkerCoordinates> = ({setMarkerCoordinates,setPolygonCoordinates, drawType}) => {
    // State variables to hold map, marker coordinates, and vector source
    const [map, setMap] = useState<Map | null>(null);
    const [vectorSource, setVectorSource] = useState<VectorSource | null>(null);

    // Create a ref for the map
    const mapRef = useRef<Map | null>(null);

    useEffect(() => {
        // Clear existing map if it exists
        if (mapRef.current) {
            mapRef.current.setTarget(undefined);
            mapRef.current = null;
        }
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
        const drawPointInteraction = new Draw({
            source: vectorSource,
            type: 'Point',
        });

        // Event handler when drawing is completed
        drawPointInteraction.on('drawend', (event: any) => {
            // Get the coordinates of the drawn feature
            const coordinates = event.feature.getGeometry().getCoordinates();
            // Convert coordinates back to the original format
            setMarkerCoordinates(toLonLat(coordinates));
            // Clear previous features
            vectorSource.clear();
        });

        // Add the draw interaction to the map
        initialMap.addInteraction(drawPointInteraction);

        // Create draw interaction for polygons
        const drawPolygonInteraction = new Draw({
            source: vectorSource,
            type: 'Polygon',
        });

        // Event handlers for drawing polygons
        drawPolygonInteraction.on('drawstart', () => {
            // Clear any existing polygon coordinates
            setPolygonCoordinates([]);
        });

        drawPolygonInteraction.on('drawend', (event: any) => {
            const coordinates = event.feature.getGeometry().getCoordinates();
            setPolygonCoordinates(coordinates);
            console.log('coordinates', coordinates)

            // Display the drawn polygon on the map
            const polygonStyle = new Style({
                fill: new Fill({
                    color: 'rgba(0, 0, 0, 0.3)', // Change the color for the completed polygon
                }),
                stroke: new Stroke({
                    color: 'black',
                    width: 2,
                }),
            });

            const polygonFeature = new Feature(new Polygon(coordinates));
            polygonFeature.setStyle(polygonStyle); // Apply the style to the polygon points
            vectorSource.addFeature(polygonFeature);
        });

        initialMap.addInteraction(drawPolygonInteraction);

        // Toggle between interactions based on user selection
        const toggleDrawInteraction = (type: string) => {
            if (type === 'Point') {
                drawPointInteraction.setActive(true);
                drawPolygonInteraction.setActive(false);
            } else if (type === 'Polygon') {
                drawPointInteraction.setActive(false);
                drawPolygonInteraction.setActive(true);
            }
        };

        toggleDrawInteraction(drawType);

    }, [drawType]); 
    

    return (
        <Grid sx={{ width: '100%'}}>
            <Box id="map" sx={{ width: '100%', height: '400px' }}></Box>
        </Grid>
    );
};

export default MapComponent;

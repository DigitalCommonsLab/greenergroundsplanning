import React, { useRef, useEffect, useState } from "react";
import maplibregl from "maplibre-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import * as turf from "turf";
import "./map.css";
import { isMobile } from 'react-device-detect';
import {
    processLabelsFeatures,
    getFullItemFromCircoscrizioni,
    getFullItemFromPoloSociale,
} from "../data/mapFunctions.js"

import { COLOR_TREES_CONFIG } from "../components/treesColor.config.js"

var hoveredCircoscrizioniId = null;
var hoveredPoliId = null;
var popUpIsOpen = false;

// const fetchJson = async (url) => {
//     //console.log("Fetching trees json")
//     const response = await fetch(url);
//     return response.json();
// };

// const fetchProps = async () => {
//     console.log("Fetching props")
//     propTrees = await fetchJson(window.location.origin + "/geo_data_trees.geojson")
//     propCircoscrizioni = await fetchJson(window.location.origin + "/circoscrizioni.json")
//     propPoliSociali = await fetchJson(window.location.origin + "/poli_sociali.json")
// }

export default function Map(props) {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng] = useState(11.3426);
    const [lat] = useState(44.4949);
    const [API_KEY] = useState("trl1hRCUkVCSDvXlaqFz");

    console.log('props', props)

    var zoom
    var minZoom
    var drawRemoved = 1

    if (isMobile) {
        zoom = 10.25;
        minZoom = 9.5
    } else {
        zoom = 11;
        minZoom = 9.5
    }

    const propCircoscrizioni = props.propCircoscrizioni;
    const propPoliSociali = props.propPoliSociali
    const propTrees = props.propTrees
    const propPredictions = props.propPredictions

    console.log('propTrees', propTrees)
    console.log('propPredictions', propPredictions)

    /* const initializeMap_1 = () => {
        if (map.current) return;

        map.current = new maplibregl.Map({
            container: mapContainer.current,
            style: `https://api.maptiler.com/maps/streets/style.json?key=${API_KEY}`,
            vectorTiles: true,
            sourceLayer: "geo_data_trees",
            center: [lng, lat],
            zoom: zoom,
            maxZoom: 20,
            trackResize: true,
            minZoom: minZoom,
            attributionControl: false
        });

        map.current.getCanvas().style.cursor = "";

       

        map.current.on("load", function (e) {

            map.current.addSource('some_1', {
                type: 'vector',
                url: 'https://api.maptiler.com/tiles/db07287c-d9d5-4301-bfec-13de112cf89a/tiles.json?key=889AkOUJC5WPzxdpH3zr'
            });

            map.current.addSource("Trees", {
                type: "geojson",
                data: propTrees,
                generateId: true
            });

            map.current.addLayer('TreesLayer',{
                id: "TreesLayer",
                type: "circle",
                source: "Trees",
                minzoom: 15.2,
                paint: {
                    "circle-color": 'green',
                    "circle-radius": [
                        "interpolate", ["linear"], ["zoom"],
                        15.2, [
                            'interpolate', ['linear'], ["to-number", ['get', 'DBH (cm)']],
                            7, 1.5,
                            90, 4.0,
                        ],
                        19.5, [
                            'interpolate', ['linear'], ["to-number", ['get', 'DBH (cm)']],
                            7, 10,
                            90, 30,
                        ],
                    ],
                    "circle-opacity": 0.6,
                },
            });

            map.current.addLayer('PredictionsLayer',{
                id: "PredictionsLayer",
                type: "circle",
                paint: {
                    "circle-color": 'green',
                    "circle-radius": [
                        "interpolate", ["linear"], ["zoom"],
                        15.2, [
                            'interpolate', ['linear'], ["to-number", ['get', 'DBH (cm)']],
                            7, 1.5,
                            90, 4.0,
                        ],
                        19.5, [
                            'interpolate', ['linear'], ["to-number", ['get', 'DBH (cm)']],
                            7, 10,
                            90, 30,
                        ],
                    ],
                    "circle-opacity": 0.6,
                },
            });

            map.current.addLayer({
                id:'sourceLayer',
                type:'fill',
                source:'some_1',
                'source-layer': 'contour',
                //'source-layer':'PredictionsLayer',
                paint:{
                    'fill-color':'red',
                    'fill-opacity':0.5
                }
            })

        });

    } */

    const initializeMap = () => {
        if (map.current) return;

        var dataLabelsPoliSociali = processLabelsFeatures(propPoliSociali)
        var dataLabelsCircoscrizioni = processLabelsFeatures(propCircoscrizioni)

        const popup = new maplibregl.Popup({
            closeButton: false,
        });

        var draw = new MapboxDraw({
            displayControlsDefault: false,
            controls: {
                polygon: true,
                trash: true
            },
        });

        map.current = new maplibregl.Map({
            container: mapContainer.current,
            style: `https://api.maptiler.com/maps/streets/style.json?key=${API_KEY}`,
            vectorTiles: true,
            sourceLayer: "geo_data_trees",
            center: [lng, lat],
            zoom: zoom,
            maxZoom: 20,
            trackResize: true,
            minZoom: minZoom,
            attributionControl: false
        });

        map.current.getCanvas().style.cursor = "";

        map.current.on("load", function (e) {

            map.current.addSource("Trees", {
                type: "geojson",
                data: propTrees,
                generateId: true
            });

            map.current.addSource("Predictions", {
                type: "geojson",
                data: propPredictions,
                generateId: true
            });

            //SOURCE per poli sociali
            map.current.addSource("poli_sociali", {
                type: "geojson",
                data: propPoliSociali,
                generateId: true
            });
            //SOURCE per circoscrizioni
            map.current.addSource("circoscrizioni", {
                type: "geojson",
                //'data': window.location.origin + '/circoscrizioni.json',
                data: propCircoscrizioni,
                generateId: true
            });

            //SOURCES per i lables di entrambi i poli sociali e le circoscrizioni
            map.current.addSource("polyLabelsCircoscrizioni", {
                type: 'geojson',
                data: dataLabelsCircoscrizioni,
                generateId: true
            })
            map.current.addSource("polyLabelsPoliSociali", {
                type: 'geojson',
                data: dataLabelsPoliSociali,
                generateId: true
            })

            //TODO : special color for each species
            /* let speciesColor = [
                'match',
                ['get', 'Name'],
                'White',
                '#fbb03b',
                'Black',
                '#223b53',
                'Hispanic',
                '#e55e5e',
                'Asian',
                '#3bb2d0',
                '#ccc'
            ] */

            map.current.addLayer({
                id: "TreesLayer",
                type: "circle",
                source: "Trees",
                minzoom: 15.2,
                paint: {
                    // we want to color the tree based on the species (Name)
                    "circle-color": COLOR_TREES_CONFIG,
                    /* "circle-color": [
                        ['get', 'Name']
                    ], // 'green' */
                    "circle-radius": [
                        "interpolate", ["linear"], ["zoom"],
                        15.2, [
                            'interpolate', ['linear'], ["to-number", ['get', 'DBH (cm)']],
                            7, 1.5,
                            90, 4.0,
                        ],
                        19.5, [
                            'interpolate', ['linear'], ["to-number", ['get', 'DBH (cm)']],
                            7, 10,
                            90, 30,
                        ],
                    ],
                    "circle-opacity": 0.6,
                },
            });

            map.current.addLayer({
                id: "PredictionsLayer",
                type: "circle",
                source: "Predictions",
                paint: {
                    "circle-color": 'red',
                    "circle-radius": 7,
                    "circle-opacity": 0.6,
                },
            });

            map.current.addLayer({
                id: "poli_socialiLayer",
                type: "fill",
                source: "poli_sociali",
                minzoom: 12.2,
                maxzoom: 15.1999999,
                paint: {
                    "fill-color": "#1fa141",
                    'fill-opacity': [
                        "interpolate", ["linear"], ["to-number", ['get', 'trees_within']],
                        0, ['case',
                            ['boolean', ['feature-state', 'hover'], false], // Set this to false
                            0.25,
                            0.15,
                        ],
                        1750, ['case',
                            ['boolean', ['feature-state', 'hover'], false], // Set this to false
                            0.85,
                            0.75,
                        ],
                    ],
                },
                filter: ['==', '$type', 'Polygon']
            });
            map.current.addLayer({
                id: "circoscrizioniLayer",
                type: "fill",
                source: "circoscrizioni",
                minzoom: 8,
                maxzoom: 12.19999999,
                paint: {
                    "fill-color": "#1fa141",
                    'fill-opacity': [
                        "interpolate", ["linear"], ["to-number", ['get', 'trees_within']],
                        100, ['case',
                            ['boolean', ['feature-state', 'hover'], false], // Set this to false
                            0.25,
                            0.15,
                        ],
                        4000, ['case',
                            ['boolean', ['feature-state', 'hover'], false], // Set this to false
                            0.85,
                            0.75,
                        ],
                    ],
                },
                filter: ['==', '$type', 'Polygon']
            });

            map.current.addLayer({
                id: "poli_socialiLine",
                type: "line",
                source: "poli_sociali",
                minzoom: 12.2,
                maxzoom: 21,
                'paint': {
                    'line-color': '#1fa141',
                    'line-opacity': 0.7,
                    'line-width': ["interpolate", ["linear"], ["zoom"],
                        // zoom is 5 (or less) -> circle radius will be 1px
                        12.2, 1,
                        // zoom is 10 (or greater) -> circle radius will be 5px
                        20, 5
                    ]
                }
            });
            map.current.addLayer({
                id: "circoscrizioniLine",
                type: "line",
                source: "circoscrizioni",
                minzoom: 8,
                maxzoom: 15.1999999,
                'paint': {
                    'line-color': '#1fa141',
                    'line-opacity': 0.88,
                    'line-width': ["interpolate", ["linear"], ["zoom"],
                        // zoom is 5 (or less) -> circle radius will be 1px
                        11, 1,
                        // zoom is 10 (or greater) -> circle radius will be 5px
                        12.19999999, 2.75
                    ]
                }
            });

            map.current.addLayer({
                'id': 'lablesCircoscrizioni',
                'type': 'symbol',
                'source': 'polyLabelsCircoscrizioni',
                minzoom: 9.9,
                maxzoom: 12.19999999,
                'layout': {
                    // get the title name from the source's "title" property
                    'text-field': ['get', 'title'],
                    'text-font': [
                        'Open Sans Semibold',
                        'Arial Unicode MS Bold'
                    ],
                }
            });
            map.current.addLayer({
                'id': 'lablesPoliSociali',
                'type': 'symbol',
                'source': 'polyLabelsPoliSociali',
                minzoom: 12.2,
                maxzoom: 21,
                'layout': {
                    // get the title name from the source's "title" property
                    'text-field': ['get', 'title'],
                    'text-font': [
                        'Open Sans Semibold',
                        'Arial Unicode MS Bold'
                    ],
                }
            });

            map.current.addControl(
                new maplibregl.NavigationControl(),
                "top-right"
            );

            map.current.addControl(new maplibregl.AttributionControl(), 'bottom-left');
            //map.current.addControl(draw, "top-right")
        });

        map.current.on("click", (e) => {
            if (map.current.getZoom() < 15.1999999) {
                map.current.getCanvas().style.cursor = "";
                props.setCardInfo({
                    name: "citta",
                    item_name: null
                })
                map.current.flyTo({
                    center: [lng, lat],
                    zoom: zoom
                })
            }
        });

        map.current.on("click", "TreesLayer", (e) => {
            e.preventDefault();
            map.current.getCanvas().style.cursor = "";
            props.setCardInfo({
                name: 'albero',
                item_info: e.features[0].properties
            })
            map.current.flyTo({
                center: [e.features[0].properties.Longitude, e.features[0].properties.Latitude],
            })
        });

        // ZOOM sulla circoscrizione una volta cliccata.
        map.current.on("click", "circoscrizioniLayer", (e) => {
            e.preventDefault();
            map.current.getCanvas().style.cursor = "";
            props.setCardInfo({
                name: "circoscrizioni",
                item_name: e.features[0].properties.nome
            })
            let name = e.features[0].properties.nome;
            // Dobbiamo chiamare la funzione per averer l' item con le coordinate. Il dato 'e' ritornato dal layer della mappa non ha questa informazione.
            let item = getFullItemFromCircoscrizioni(propCircoscrizioni, name)
            // Necessita di un file geoJson come input. Nel nostro caso Item va bene. Ritorna i bounds del poligono
            let bounds = turf.bbox(item)
            map.current.fitBounds(bounds, {
                padding: 20
            });
        });

        map.current.on("click", "poli_socialiLayer", (e) => {
            if (map.current.getZoom() <= e.features[0].layer.maxzoom) {
                e.preventDefault();
                map.current.getCanvas().style.cursor = "";
                props.setCardInfo({
                    name: "poli",
                    item_name: e.features[0].properties.nome_quart
                })
                let name = e.features[0].properties.nome_quart;
                //console.log(e.features[0].properties)
                // Dobbiamo chiamare la funzione per averer l' item con le coordinate. Il dato 'e' ritornato dal layer della mappa non ha questa informazione.
                let item = getFullItemFromPoloSociale(propPoliSociali, name)
                // Necessita di un file geoJson come input. Nel nostro caso Item va bene. Ritorna i bounds del poligono
                let bounds = turf.bbox(item)
                map.current.fitBounds(bounds, {
                    padding: 20
                });
            }
        });

        map.current.on("mousemove", "TreesLayer", (e) => {
            e.preventDefault();
            map.current.getCanvas().style.cursor = "pointer";
            // Populate the popup and set its coordinates based on the feature.
            let features = e.features[0];
            //console.log(e.features[0])
            if (popUpIsOpen) {
                try {
                    popup.remove()
                } catch (e) {
                    console.log('Error closing popup')
                }
            }

            popUpIsOpen = true
            popup.setLngLat(features.geometry.coordinates).setHTML(
                "<div>" +
                '<b>' + features.properties.Name + '</b>' +
                "<br/>" +
                '<p>Tree ID: ' + features.properties['Tree ID'] + '</p>' +
                "</div>"
            ).addTo(map.current);

        });

        map.current.on("mouseover", "PredictionsLayer", (e) => {
            // Get the current zoom level
            let zoom = map.current.getZoom();

            // Check if the zoom level is greater than or equal to your desired zoom level
            if (zoom >= 15.2) {
                e.preventDefault();
                map.current.getCanvas().style.cursor = "pointer";
                // Populate the popup and set its coordinates based on the feature.
                let features = e.features[0];
                //console.log(e.features[0])
                if (popUpIsOpen) {
                    try {
                        popup.remove()
                    } catch (e) {
                        console.log('Error closing popup')
                    }
                }

                popUpIsOpen = true
                popup.setLngLat(features.geometry.coordinates).setHTML(
                    "<div>" +
                    '<p><b>Species:</b> ' + features.properties.tree + '</p>' +
                    "</div>" + 
                    "<div>" +
                    '<p><b>Predicted benefit:</b> ' + parseFloat(features.properties.benefit).toFixed(2) + '€</p>' +
                    "</div>" 
                ).addTo(map.current);
            }
        });

        map.current.on("mouseleave", "TreesLayer", (e) => {
            e.preventDefault();
            map.current.getCanvas().style.cursor = "";
            if (popUpIsOpen) {
                try {
                    popup.remove()
                } catch (e) {
                    console.log('Error closing popup')
                }
            }
        });

        map.current.on("mousemove", "circoscrizioniLayer", (e) => {
            e.preventDefault();
            map.current.getCanvas().style.cursor = "pointer";
            if (e.features.length > 0) {
                if (hoveredCircoscrizioniId !== null) {
                    map.current.setFeatureState(
                        { source: "circoscrizioni", id: hoveredCircoscrizioniId },
                        { hover: false }
                    );
                }
                hoveredCircoscrizioniId = e.features[0].id;
                map.current.setFeatureState(
                    { source: "circoscrizioni", id: hoveredCircoscrizioniId },
                    { hover: true }
                );
            }
        });

        map.current.on('mouseleave', 'circoscrizioniLayer', (e) => {
            e.preventDefault();
            map.current.getCanvas().style.cursor = "";
            if (hoveredCircoscrizioniId !== null) {
                map.current.setFeatureState(
                    { source: 'circoscrizioni', id: hoveredCircoscrizioniId },
                    { hover: false }
                );
            }
            hoveredCircoscrizioniId = null;
        });

        map.current.on("mousemove", "poli_socialiLayer", (e) => {
            e.preventDefault();
            if (e.features.length > 0) {
                map.current.getCanvas().style.cursor = "pointer";
                if (hoveredPoliId !== null) {
                    map.current.setFeatureState(
                        { source: "poli_sociali", id: hoveredPoliId },
                        { hover: false }
                    );
                }
                hoveredPoliId = e.features[0].id;
                map.current.setFeatureState(
                    { source: "poli_sociali", id: hoveredPoliId },
                    { hover: true }
                );
            } else {
                map.current.getCanvas().style.cursor = "";
            }
        });

        map.current.on('mouseleave', 'poli_socialiLayer', (e) => {
            e.preventDefault();
            map.current.getCanvas().style.cursor = "";
            if (hoveredPoliId !== null) {
                map.current.setFeatureState(
                    { source: 'poli_sociali', id: hoveredPoliId },
                    { hover: false }
                );
            }
            hoveredPoliId = null;
        });

        map.current.on("zoom", () => {
            if (drawRemoved === 1 && map.current.getZoom() > 15.199999) {
                drawRemoved = 0
                map.current.addControl(draw, "top-right")
            } else if (drawRemoved === 0 && map.current.getZoom() <= 15.199999) {
                drawRemoved = 1
                map.current.removeControl(draw)
            }
        });

        map.current.on('draw.create', (e) => {
            var data = draw.getAll()

            var pids = []
            const lid = data.features[data.features.length - 1].id
            data.features.forEach((f) => {
                if (f.geometry.type === 'Polygon' && f.id !== lid) {
                    pids.push(f.id)
                }
            })
            draw.delete(pids)

            if (data.features.length > 1)
                data.features.shift()

            props.setCardInfo({
                name: ""
            })
            props.setCardInfo({
                name: "poligono",
                item_name: Math.random(),
                item_info: data
            })
        });
        map.current.on('draw.delete', (e) => {
            props.setCardInfo({
                name: "citta",
            })
        });

        //getData().then(data => {console.log(data)}); //TODO: implement fetch from external server
    };

    useEffect(() => {
        initializeMap();
    }, []);

    return (
        <div ref={mapContainer} className="map" />
    );
}

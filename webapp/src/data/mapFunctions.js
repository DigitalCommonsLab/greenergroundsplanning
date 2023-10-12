import * as polylabel from "polylabel";

async function fetchJson(url){
    const response = await fetch(url);
    return response.json();
};

export async function fetchProps() {
    let propTrees = await fetchJson(window.location.href + "/geo_data_trees.geojson")
    let propCircoscrizioni = await fetchJson(window.location.href + "/circoscrizioni.json")
    let propPoliSociali = await fetchJson(window.location.href + "/poli_sociali.json")
    return [propTrees,propCircoscrizioni,propPoliSociali]
}

/* export async function fetchProps() {
    console.log("Fetching props");

    // Check if data is already cached
    const cachedData = getCachedData();
    if (cachedData) {
        return cachedData;
    }

    // If data is not cached, fetch and cache it
    let propTrees = await fetchJson(window.location.href + "/geo_data_trees.geojson");
    let propCircoscrizioni = await fetchJson(window.location.href + "/circoscrizioni.json");
    let propPoliSociali = await fetchJson(window.location.href + "/poli_sociali.json");

    // Cache the fetched data
    cacheData([propTrees, propCircoscrizioni, propPoliSociali]);

    return [propTrees, propCircoscrizioni, propPoliSociali];
}

// Function to cache data in localStorage
function cacheData(data) {
    const dataToCache = JSON.stringify(data);
    localStorage.setItem('cachedData', dataToCache);
}

// Function to retrieve cached data from localStorage
function getCachedData() {
    const cachedData = localStorage.getItem('cachedData');
    return cachedData ? JSON.parse(cachedData) : null;
}

 */

// calcolo il punto ottimale per mettere il testo contenente il nome del 'poligono'
// il testo e' determinato dal campo 'nome' o 'nome_quart' a seconda di che geojson sta analizzando
export function processLabelsFeatures(geojson){
    let coordinatesLabels = {
        'type': 'FeatureCollection',
        'features': []
    }
    geojson.features.map((item) => {
        let tempFeature = {
            'type': 'Feature',
            'geometry': {
                'type': 'Point',
                'coordinates': []
            },
            'properties': {
                'title': ''
            }
        }
        let coord = item.geometry.coordinates;
        //let p = polylabel(coord,0.2)
        let p = polylabel(coord,0.0035)
        //console.log(p)
        let coordArray = [p[0],p[1]];
        tempFeature.geometry.coordinates = coordArray
        if(item.properties.nome !== undefined)
            tempFeature.properties.title = item.properties.nome
        else
            tempFeature.properties.title = item.properties.nome_quart
        coordinatesLabels.features.push(tempFeature)

        return item
    })
    return coordinatesLabels
    //propCircoscrizioni.features.filter(item => item.properties.nome == e.features[0].properties.nome)
}

export function getFullItemFromCircoscrizioni(geojson,name){ 
    return geojson.features.filter(item => item.properties.nome === name)[0]
}

export function getFullItemFromPoloSociale(geojson,name){ 
    return geojson.features.filter(item =>item.properties.nome_quart === name)[0]
}
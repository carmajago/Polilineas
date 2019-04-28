var tj = require('togeojson'),
	fs = require('fs'),
	// node doesn't have xml parsing or a dom. use xmldom 
	DOMParser = require('xmldom').DOMParser;
var polyline = require('@mapbox/polyline');

//Change the PATH to your kml Path

const file = '/home/carlos/Escritorio/rutas/614JR MALTERIA JUANCHITO VILLAPILAR.kml'


const geojson = toGeoJSON(file);

console.log(geojson.features[2]);

const points = [];

geojson.features.forEach(element => {
	const latitude = element.geometry.coordinates[1];
	const longitude = element.geometry.coordinates[0];
	const ar = [];
	ar.push(latitude);
	ar.push(longitude);
	console.log(ar);
	points.push(ar);
});
const poli1 = polyline.encode(points);
console.log(poli1);

function toGeoJSON(route) {

	var kml = new DOMParser().parseFromString(fs.readFileSync(route, 'utf8'));
	var converted = tj.kml(kml);
	return converted;
}



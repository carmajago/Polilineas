var tj = require('togeojson'),
    fs = require('fs'),
    // node doesn't have xml parsing or a dom. use xmldom 
    DOMParser = require('xmldom').DOMParser;
var encode = require('geojson-polyline/stream').encode;

const file = '/home/edison/Documentos/Citytaxi_docs/Socobuses/INFORMACION SOCOBUSES/Rutas/601i_Morrogacho_Sultana_601r_Sultana_Morrogacho.kml' 

toGeoJSON(file).then((geojson)=> {
	convertedWithStyles(geojson).then((converted) => {
		console.log(JSON.stringify(converted))
		createFile(converted).then((fileCreated) => {
			readFileGeoJSON(fileCreated);
		}).catch((dontCantCreated) => {
			console.error('dontCantCreated', dontCantCreated);
		})
	})
})


function toGeoJSON(route) {
	return new Promise((resolve, reject) => {
		const kml = new DOMParser().parseFromString(fs.readFileSync(route, 'utf8'));
		return resolve(kml);
	})
}

function convertedWithStyles(kml) {
	return new Promise((resolve, reject) => {
		const converted =  tj.kml(kml, { styles: true });
		return resolve(converted);
	})
	
}

function createFile(converted) {
	return new Promise((resolve, reject) => {
		const fileToWrite = "/tmp/tests.geojson";
		fs.writeFile(fileToWrite, JSON.stringify(converted) , function(err) {
		    if(err) {
		        return reject(err);
		    }  
		    return resolve(fileToWrite);
		}); 
	})
}

function readFileGeoJSON(filePath) {
	fs.createReadStream('/tmp/tests.geojson')
	  .pipe(encode({precision: 15}))
	  .pipe(process.stdout)
}
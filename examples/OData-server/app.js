var http = require('http');
var Datastore = require('nedb');
var db = new Datastore({ inMemoryOnly: true });
var ODataServer = require('simple-odata-server');
var Adapter = require('simple-odata-server-nedb');

var model = {
    namespace: "jsreport",
    entityTypes: {
        "SeriesType": {
            "_id": { "type": "Edm.String", key: true },
            "Desc": { "type": "Edm.String" },
            "Seasons": { "type": "Edm.String" }
        },
        "MoviesType": {
            "_id": { "type": "Edm.String", key: true },
            "Name": { "type": "Edm.String" },
            "Director": { "type": "Edm.String" },
            "Year": { "type": "Edm.String" }
        },
    },
    entitySets: {
        "series": {
            entityType: "jsreport.SeriesType"
        },
        "movies": {
            entityType: "jsreport.MoviesType"
        }
    }
};

// Documentos de ejemplos para el modelo de la DB in memory
// TODO: levantar un archivo JSON local para poder tener ejemplos más dinámicos
doc = {
    series: [{
        Desc: 'Breaking Bad',
        Seasons: '6'
    },
    {
        Desc: 'Fargo',
        Seasons: '4'
    }],
    movies: [{
        Name: 'Back to the future',
        Director: 'Robert Zemeckis',
        Year: '1985'
    },
    {
        Name: 'Back to the future',
        Director: 'Robert Zemeckis',
        Year: '1985'
    },
    {
        Name: 'Back to the future',
        Director: 'Robert Zemeckis',
        Year: '1985'
    }]
};

db.insert(doc.movies, function (err, newDoc) {
});
db.insert(doc.series, function (err, newDoc) {
});

var odataServer = ODataServer("http://localhost:1337")
    .model(model)
    .adapter(Adapter(function (es, cb) { cb(null, db) }));
http.createServer(odataServer.handle.bind(odataServer)).listen(1337);

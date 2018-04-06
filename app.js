let express = require('express'),
	path = require('path'),
	bodyParser = require('body-parser'),
	cons = require('consolidate'),
	dust = require('dustjs-helpers'),
	morgan = require('morgan'),
	pg = require('pg'),
	cookieParser = require('cookie-parser'),
	cors =require('cors'),
	app = express();

var mongoose = require('mongoose');
var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/proyecto1db";

let pool = new pg.Pool({
  host: 'localhost',
  user: 'CRM',
  database: 'Proyecto1',
  password: 'holi1234',
  port: 5432
 })

//cors de express
app.use(cors());

// Body Parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(morgan('dev')); 

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.delete('/api/removemedico/:id', function(request, response){
	var id = request.params.id;
	pool.connect(function(err, db, done){
		if(err){
			return response.status(400).send(err)
		}
		else{
			db.query('DELETE FROM "Medico" WHERE id_medico = $1', [Number(id)], function(err, result){
				if(err){
					return response.status(400).send(err)
				}
				else{
					return response.status(200).send({message: 'Success on delete'})
				}
			})
		}
	})
	
})

app.get('/api/Medico', function(request, response){
	pool.connect(function(err,db,done){
		if(err){
			return response.status(400).send(err)
		} else{
			db.query('SELECT id_medico as id, nombre, especialidad FROM "Medico"', function(err, table){
				done();

				if(err){
					return response.status(400).send(err)
				}
				else{
					return response.status(200).send(table.rows)
				}
			})
		}
	});
})


app.get('/api/filtrarMedico', function(request, response){
	console.log('en el metodo');
	pool.connect(function(err,db,done){
		console.log('conectada a db');
		if(err){
			return response.status(400).send(err)
		} else{
			console.log('start query');
			db.query('SELECT id_medico as id, nombre, especialidad FROM "Medico" WHERE $1 = $2',
				[ request.body.filtro, request.body.cambio], function(err, table){
				done();
				console.log('fin query');
				if(err){
					return response.status(400).send(err)
				}
				else{
					return response.status(200).send(table.rows)
				}
			})
		}
	});
})

app.post('/api/cambiarMedico/:id', function(request, response) {
	console.log('Backend');
	var id = request.params.id;
	console.log('Adentro de endpoint');
	pool.connect(function(err, db, done) {
		console.log('Adentro de callback de postgres');
		if (err) {
			return response.status(400).send(err);
		}
		
		db.query(
			'UPDATE "Medico" SET nombre = $1, especialidad = $2 WHERE id_medico = $3',
			[ request.body.nombre, request.body.especialidad, Number(id)],
			(err, table) => {
				console.log('Adentro de callback de insert');
				done();

				if (err){
					return response.status(400).send(err);
				}
				
				console.log('DATA UPDATE');
				response.status(201).send({message:'Data updated!'});
			}
		);
	});
});

app.post('/api/mediconuevo', function(request, response) {
	//console.log('Adentro de endpoint');
	pool.connect(function(err, db, done) {
		//console.log('Adentro de callback de postgres');
		if (err) {
			return response.status(400).send(err);
		}
		
		db.query(
			'INSERT INTO "Medico" (nombre, especialidad) VALUES ($1, $2)',
			[ request.body.nombre, request.body.especialidad],
			(err, table) => {
				//console.log('Adentro de callback de insert');
				done();

				if (err){
					return response.status(400).send(err);
				}
				
				console.log('DATA INSERTED');
				response.status(201).send({message:'Data inserted!'});
			}
		);
	});
});

//Conectando a Mongo para obtener la coleccion twitter_search y sacar los tweets de cada usuario
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  //Creating a database named proy1db
  var proyecto1db = db.db("proyecto1db");
  proyecto1db.collection("twitter_search").find({}, {_id: 0, username:1, tweet:1}).toArray(function(err, res) {
	//Creating a collection named twitter
    if (err) throw err;
    console.log(res);
    db.close();
  });
});

//Server
app.listen(3000, function(){
	console.log('Iniciar server en el puerto 3000');

});




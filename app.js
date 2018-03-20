<<<<<<< HEAD
let express = require('express'),
	//path = require('path'),
	bodyParser = require('body-parser'),
	morgan = require('morgan'),
	pg = require('pg');
	
// var server = require('http').Server(app); 
// var io = require('socket.io')(server); 
// var massive = require("massive");
=======
var express = require('express'),
	path = require('path'),
	bodyParser = require('body-parser'),
	cons = require('consolidate'),
	dust = require('dustjs-helpers'),
	pg = require('pg'),
	app = express();
>>>>>>> a1825e193698eff9d7bc0769ad22f728bcd7b8e9

// var startExpress = function() {
	// server.listen(config.express.port); db = app.get('db');
// }

<<<<<<< HEAD
let pool = new pg.Pool({
  host: 'localhost',
  user: 'CRM',
  database: 'Proyecto1',
  password: 'holi1234',
  port: 5432
 })

let app = express();

// Body Parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(morgan('dev')); 

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/*
pool.connect(); 
pool.query('LISTEN "changes"'); 
pool.on('notification', function(data) { io.emit("change"); });

var update = function(request, res, next) { var newDoc = request.body.data;
 db.steps.saveDoc({id:1,data:newDoc}, function(err,response){ if (err) { handleError(err) }; 
res.json({ data: response }); 
pool.query('NOTIFY "change"'); }); } 

*/

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

app.post('/api/mediconuevo', function(request, response) {
	console.log('Adentro de endpoint');
	pool.connect(function(err, db, done) {
		console.log('Adentro de callback de postgres');
		if (err) {
			return response.status(400).send(err);
		}
		
		db.query(
			'INSERT INTO "Medico" (nombre, especialidad) VALUES ($1, $2)',
			[ request.body.nombre, request.body.especialidad ],
			(err, table) => {
				console.log('Adentro de callback de insert');
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

// Server
app.listen(3000, function(){
	console.log('Server Started on port 3000');
=======
//Asignar el engine de Dust a los archivos .dust
app.engine('dust',cons.dust);

//Default ext .dust
app.set('view engine', 'dust');
app.set('views', __dirname + '/views');

//Public folder
app.use(express.static(path.join(__dirname, 'public')));

//Body parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get('/', function(req, res){
	res.render('index');
});

//Server
app.listen(3000, function(){
	console.log('Iniciar server en el puerto 3000');
>>>>>>> a1825e193698eff9d7bc0769ad22f728bcd7b8e9
});
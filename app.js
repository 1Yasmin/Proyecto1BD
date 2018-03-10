var express = require('express'),
	path = require('path'),
	bodyParser = require('body-parser'),
	cons = require('consolidate'),
	dust = require('dustjs-helpers'),
	pg = require('pg'),
	app = express();

//Coneccion con postgres
var conString = "postgres://CRM:holi1234@localhost/Proyecto1";

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
	console.log('TEST');
});

//Server
app.listen(3000, function(){
	console.log('Iniciar server en el puerto 3000');
});
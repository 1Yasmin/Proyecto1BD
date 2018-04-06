let express = require("express"),
path        = require("path"),
http        = require("http"),
pg 			= require('pg'),
cookieParser = require('cookie-parser'),
bodyParser = require('body-parser'),
core         = express();

http.createServer(core).listen(3000);

var twitter = require('twitter');
var mongoose = require('mongoose');
var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/proyecto1db";

var router = express.Router();

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



var clientT = new twitter({
consumer_key: 'Iok4qtUJHs7AllnroBMjjcQUs', 
consumer_secret: 'j8SPDfkUqcc2v7Qyt6GDxBDyJqzraEIzTCBjXZIDXUhUu2Pfsb', 
access_token_key: '793556090294198272-KZ6eZovXBRQtS4RgdmWwwul7WPS35aB', 
access_token_secret: '220NsNtxCUMPQK0wd33wY162ASlvMFxuVuUDpGbMtefky'
});
//var search = "Juan"

/*
let conString = "postgres://CRM:holi1234@localhost:Proyecto1";
*/
let conString = new pg.Pool({
  host: 'localhost',
  user: 'CRM',
  database: 'Proyecto1',
  password: 'holi1234',
  port: 5432
 })
 
client = new pg.Client(conString);
client.connect();

core.use(bodyParser.json());
core.use(bodyParser.urlencoded({ extended: false }));
core.use(cookieParser());

var params = {screen_name: 'AmaAmaLeeLee', count: 10};


core.get('/showTweets', function(req, resp, next) {
  let usuarios;
  let q = 'SELECT nombre, apellido, username FROM "Paciente";';
  client.query(q, (err, respu) => {
    if (err){
      console.log(err);
    } else {
      usuarios = respu.rows;
      resp.render('showTweets', {users: usuarios});
    }
  });
});

//Server
core.listen(3001, function(){
	console.log('Iniciar server en el puerto 3001');

});


/*
clientT.get('statuses/user_timeline', params, function(error, tweets, response){
  if (!error) {
    console.log(tweets);
  }
});
*/

//Stream data
/*
twitter.stream('statuses/filter', {track: search}, function(stream) {
stream.on('data', function(tweet) {
console.log(tweet.text);
});
stream.on('error', function(error) {
});
});
*/
//Saving tweets in mongo 
//Creating a schema 

/*
var tweetSave = new mongoose.Schema({
	userName: String,	
	tweet: String
});

var User = mongoose.model("User", tweetSave);
*/
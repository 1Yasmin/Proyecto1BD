var express = require('express'),
	path = require('path'),
	badyParser = require('consolidate'),
	dust = require('dustjs-helpers'),
	pg = require('pg'),
	app = express();

//Coneccion con postgres
var conString = "postgres://CRM:holi1234@localhost/Proyecto1";

app.engine('dust',cons.dust);
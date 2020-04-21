var express = require('express');
var request = require('request');
var app = express();
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	res.render('home');
});

app.get('/results', (req, res) => {
	var search=req.query.search;
	var url = 'http://www.omdbapi.com/?apikey=thewdb&s='+search;
	request(url, (error, response, body) => {
		if (!error && response.statusCode == 200) {
			var data=JSON.parse(body);
			res.render('result',{data:data});
		}
	});
});

app.listen(3000, function() {
	console.log('server is running');
});
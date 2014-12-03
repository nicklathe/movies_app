var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var request = require("request");

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(__dirname + "/public"));



//Loads home page so user can search for a title
app.get("/", function(req, res){
  	res.render("index");

});

//Posts the searched movie title and displays results on search.ejs
app.get("/search", function(req, res){
		request('http://www.omdbapi.com/?s=' + req.query.title, function (error, response, body) {
  		if (!error && response.statusCode == 200) {
  			var results = JSON.parse(body);
    		res.render("search", results);
 		}
	})
})
//Movies that are selected are displayed on the movies.ejs
app.get("/search/:imdbID", function(req, res){
	var imdb = req.params.imdbID;
		request('http://www.omdbapi.com/?i=' + imdb + "&tomatoes=true&", function (error, response, body) {
  		if (!error && response.statusCode == 200) {
  			var results = JSON.parse(body);
    		res.render("movies", results);
 		}
	})
})




app.listen(3000);



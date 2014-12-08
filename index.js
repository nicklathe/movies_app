var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var request = require("request");
var db = require("./models/index.js");

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(__dirname + "/public"));



// Loads home page so user can search for a title
app.get("/", function(req, res){
  	res.render("index");
});

app.get("/find", function(req, res){
  res.render("find");
});

// Posts the searched movie title and displays results on search.ejs
app.get("/search", function(req, res){
		request('http://www.omdbapi.com/?s=' + req.query.title, function (error, response, body) {
  		if (!error && response.statusCode == 200) {
  			var results = JSON.parse(body);
    		res.render("search", {results:results});
 		};
	});
});

//Movies that are selected are displayed on the movies.ejs
app.get("/search/:imdbID", function(req, res){
	var imdb = req.params.imdbID;
		request('http://www.omdbapi.com/?i=' + imdb + "&tomatoes=true&", function (error, response, body) {
  		if (!error && response.statusCode == 200) {
  			var results = JSON.parse(body);
    		res.render("movies", {results:results});
 		};
	});
});

// // Posts movies to watch list and db
// app.post("/added", function(req, res){
//   db.Movie.create(req.body).done(function(err, savedMovie){
//   res.render("added", {savedMovie:savedMovie});
//   // res.send(savedMovie);
//   });
// });

///////find or create test///////////
app.post("/added", function(req, res){
  db.Movie.findOrCreate({where: req.body}).then(function(savedMovie){
    // res.send(savedMovie);
    var movArray = {
      savedMovie:savedMovie[0],
      trufalse:savedMovie[1]
    };

    if(savedMovie[1] === false){
      res.render("added", movArray);
    // } else if(savedMovie[1] === true){
    } else if(savedMovie[1] === true){
        res.render("added", movArray);
    };
  });
});
////////////////////////////////////////



// Gets movies stored in db to display on watch page
app.get("/watch", function(req, res){
  db.Movie.findAll().done(function(err, watchedMovies){
    res.render("watch", {watchedMovies: watchedMovies});
  });
});

// Deletes movie from database and watch list
app.post("/delete", function(req, res){
  db.Movie.find({where: {title: req.body.title}}).done(function(err, movieToDel){
    movieToDel.destroy().done(function(err, deletedMovie){
      res.render("delete");
    });
  });
});



app.listen(3000);



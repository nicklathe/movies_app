var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var request = require("request");
var db = require("./models");

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
      if(error) throw err;
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
        db.movie.count({where: {imdb:results.imdbID}}).then(function(foundItem){
          var wasFound = foundItem > 0;
          res.render("movies", {results:results, movieFound:wasFound});
        });
    		// res.render("movies", {results:results});
 		};
	});
});

// Find or create with jQuery//

app.post("/watch", function(req, res){
  db.movie.findOrCreate({where: req.body}).spread(function(savedMovie, created){
    var movieObj = {
      savedMovie:savedMovie,
      created:created
    };
    res.send(movieObj);
  });
});

// Gets movies stored in db to display on watch page

app.get("/watch", function(req, res){
  db.movie.findAll().done(function(err, watchedMovies){
    res.render("watch", {watchedMovies: watchedMovies});
  });
});

// Posts comments to db

app.post("/watch/:id/comments", function(req, res){
  db.movie.find({where: {id: req.params.id}}).then(function(movieData){
    movieData.createComment({comment: req.body.comment, movieId: req.params.id}).then(function(returnedData){
      res.redirect("comments")
    });
  });
});

// Get's comments page

app.get("/watch/:id/comments", function(req,res){
  var commentID = req.params.id;
  db.movie.find({where: {id: commentID}}).then(function(movieReturn){
    db.comment.findAll({where: {movieId: commentID}}).then(function(returnedComment){
      res.render("comments", {returnedComment:returnedComment, commentID:commentID, movieReturn:movieReturn});
    });
  });
});

//Delete from watchlist and db 

app.delete("/watch/:id", function(req, res){
  db.movie.destroy({where: {id: req.params.id}}).then(function(data){
    res.send({data: data});
  });
});


app.listen(3000);



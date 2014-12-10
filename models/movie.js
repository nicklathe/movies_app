"use strict";

module.exports = function(sequelize, DataTypes) {
  var movie = sequelize.define("movie", {
    imdb: DataTypes.STRING,
    title: DataTypes.STRING,
    year: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        models.movie.hasMany(models.comment);
      }
    }
  });

  return movie;
};

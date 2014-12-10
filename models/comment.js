// "use strict";

// module.exports = function(sequelize, DataTypes) {
//   var comment = sequelize.define("comment", {
//     comment: DataTypes.TEXT,
//     movieId: DataTypes.INTEGER
//   }, {
//     classMethods: {
//       associate: function(models) {
//         models.comment.belongsTo(models.movie);
//       }
//     }
//   });

//   return comment;
// };

// "use strict"; // hook test below

// module.exports = function(sequelize, DataTypes) {
//   var comment = sequelize.define("comment", {
//     comment: DataTypes.TEXT,
//     movieId: DataTypes.INTEGER
//   }, {
//     classMethods: {
//       associate: function(models) {
//         models.comment.belongsTo(models.movie);
//       }
//   }, 
//     hooks: {
//       beforeCreate: function(data, err){
//         // console.log(data);
//         return data.comment = data.comment.toLowerCase();
//       }
//     } 
//   });

//   return comment;
// };

// Hooks

"use strict";

module.exports = function(sequelize, DataTypes) {
  var comment = sequelize.define("comment", {
    comment: DataTypes.TEXT,
    movieId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        models.comment.belongsTo(models.movie);
      }
    },
      hooks: {
        beforeCreate: function(data, options, sendback){
          data.comment = data.comment.toLowerCase();
          sendback(null, data);
        }
      }
  });

  return comment;
};






var mongoose = require('mongoose/');

mongoose.connect('mongodb://localhost/MyDatabase',{useMongoClient: true});

var Schema = mongoose.Schema;
var UserDetail = new Schema({
      username: String,
      password: String
    }, {
      collection: 'userInfo'
    });
var UserDetails = mongoose.model('userInfo', UserDetail);

exports.findById = function(id, cb) {
  process.nextTick(function() {

    UserDetails.findById(id,function(err,user)
    {
      if(user) {
        cb(null, user);
      } else {
        cb(new Error('User ' + id + ' does not exist'));
      }
    })
  });
}

exports.findByUsername = function(username, cb) {
  process.nextTick(function() {
    UserDetails.findOne({
      'username': username, 
    }, function(err, user) {
      if (err) {
        return cb(err);
      } else {
        return cb(null,user);
      }
    });
  });
}

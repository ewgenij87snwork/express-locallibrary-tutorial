var userArgs = process.argv.slice(2);

var mongoose = require('mongoose');

var async = require('async');

var User = require('./models/user');

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var users = [];

function userCreate(name, role, cb) {
    userdetail = { name: name };

    if (role != false) { userdetail.role = role };

    var user = new User(userdetail);

    user.save(function (err) {
        if (err) {
            cb(err, null);
            return;
          }
        console.log('New User:' + user);
        users.push(user);
        cb(null, user);
        
    })
};

function createUsers(cb){
    async.parallel([
        function(callback){
            userCreate('Ivan', 'Library Worker', callback);
        },
        function(callback){
            userCreate('Nina', 'Library Worker', callback);
        },
        function(callback){
            userCreate('Jack', 'Director', callback);
        },
        function(callback){
            userCreate('Alex', 'Library Worker', callback);
        },
        function(callback){
            userCreate('Masha', 'Library Worker', callback);
        },
        function(callback){
            userCreate('Aleksandr', 'Library Worker', callback);
        },
        function(callback){
            userCreate('Max', false, callback);
        }
    ], cb)
}

async.series([
    createUsers,
    function(err, results) {
        if(err){console.log('Final error: ' + err)}
        else { console.log('All users: ' + users)};
        mongoose.connection.close();
    }
]);


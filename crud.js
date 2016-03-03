//Import Express Framework. Install: npm install express
var express = require('express');
var app = express();
var swagger = require('swagger-express');
var path = require('path');

var events = require('events');
var eventEmitter = new events.EventEmitter();

/*bodyParser Parses the contents of the request body. */
app.use(express.bodyParser());
/* methodOverride: works with bodyParser and provides DELETE and PUT methods along with POST. 
You can use app.put() and app.delete() rather than detecting the user’s intention from app.post(). 
This enables proper RESTful application design. 
However the form/request will require a hidden input _method that can be put or delete*/
app.use(express.methodOverride());
app.use(swagger.init(app, {
    apiVersion: '1.0',
    swaggerVersion: '1.0',
    swaggerURL: '/swagger',
    basePath: 'http://localhost:3000',
    swaggerJSON: '/api-docs.json',
    swaggerUI: './public/swagger/',
    apis: ['./api.js', './api.yml']
}));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

/* Database */
var mongoose = require('mongoose'); //Import MongoDb 'driver'.Install: npm install mongoose
mongoose.connect('mongodb://localhost/users');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

/* Models */
var User = new Schema({
    forename: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    surname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

var User = mongoose.model('User', User);

//Stream data
app.get('/stream', function(req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    });
    var countReloads = 0;
    var getUsers = function() {
    	countReloads++;
    	User.find({}, function(error, data) {
        	res.write("data: " + JSON.stringify(data) + '\n\n') && console.log(countReloads);
    })};
    eventEmitter.on('reload', getUsers);
    getUsers();
});

/* RESTful API */

//Get All
app.get('/', function(req, res) {
    res.sendfile('index.html');
});

//Get by ID
app.get('/:id', function(req, res) {
    User.find({
        _id: req.params.id
    }, function(error, data) {
        res.json(data);
    });
});

//Create New
app.post('/new', function(req, res) {
    var user_data = {
        forename: req.body.forename,
        surname: req.body.surname,
        email: req.body.email
    };
    var user = new User(user_data);
    // The collection schema has save()
    user.save(function(error, data) {
        error ? res.json(error) : res.send(data) && eventEmitter.emit('reload');
    });
});

//Update User identified by Name
app.put('/update', function(req, res) {
    // Another way of communicating with collections, collection schema does not have update(). it does but also change the id
    return User.findById(req.body.id, function(error, user) {
        req.body.forename ? user.forename = req.body.forename : user.forename = user.forename;
        req.body.surname ? user.surname = req.body.surname : user.surname = user.surname;
        req.body.email ? user.email = req.body.email : user.email = user.email;
        user.save() && res.send(user) && eventEmitter.emit('reload');
    });
});

//Delete User identified by ID
app.delete('/delete', function(req, res) {
    return User.findById(req.body.id, function(error, user) {
        // The collection schema has also remove()
        return user.remove(function(error) {
            error ? console.log(error) : res.send("delete one") && eventEmitter.emit('reload');
        });
    });
});


app.listen(3000);
console.log("Server running at localhost:3000");
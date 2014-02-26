//Import Express Framework. Install: npm install express
var express = require('express');
var app = express();
/*bodyParser Parses the contents of the request body. */
app.use(express.bodyParser());
/* methodOverride: works with bodyParser and provides DELETE and PUT methods along with POST. 
You can use app.put() and app.delete() rather than detecting the user’s intention from app.post(). 
This enables proper RESTful application design. 
However the form/request will require a hidden input _method that can be put or delete*/
app.use(express.methodOverride());


/* Database */
//var mongoose = require('mongoose'); //Import MongoDb 'driver'.Install: npm install mongoose
//mongoose.connect('mongodb://localhost/bookmarks');
//var Schema = mongoose.Schema;
//var ObjectId = Schema.ObjectId;

/* Models */
//var Bookmark = new Schema({
//        name : { type: String, required: true, trim: true, unique: true } 
//      , uri : { type: String, required: true, trim: true }
//      , description : { type: String, trim: true }
//    });

//var Bookmark = mongoose.model('Bookmark', Bookmark);

/* RESTful API */ 

//Get All
app.get('/', function(req,res){
//        Bookmark.find({}, function(error, data){
            res.json('x');
//        });
});

//Get by ID
app.get('/:id', function(req, res) {
// Bookmark.find({_id: req.params.id}, function(error, data) {
//            res.json(data);
// });
});

//Create New
app.post('/new', function(req,res) {
 var bookmark_data = {
   name: req.body.name
 , uri: req.body.uri
 , description: req.body.description
 };
 res.send(bookmark_data);
 console.log(bookmark_data);
// var bookmark = new Bookmark(bookmark_data);
// bookmark.save(function(error, data){
//            if(error){
//                res.json(error);
//            }else{
//             console.log("Added New Record");
//  res.send();
     });
//        });
 
//});

//Update Bookmark identified by Name
app.put('/update', function(req, res) {
// Bookmark.update({name:req.body.name}, {$set:{uri:req.body.uri, description:req.body.description}}, false, true)
        console.log("Updated Existing Record");
//        res.send();        
});

//Delete Bookmark identified by ID
//app.delete('/delete', function (req, res) {
//  return Bookmark.findById(req.body.id, function (error, bookmark) {
//    return bookmark.remove(function (error) {
//      if (error) {
//       console.log(error);
//      } else {
//        console.log("removed");
//        return res.send();
//      }
//    });
//  });
//});


app.listen(3000);
console.log("Server running at localhost:3000");
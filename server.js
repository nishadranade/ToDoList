
// set up
var express = require('express');                  
var app = express();                               //create the app with express
var mongoose = require('mongoose');                //mongoose for mongodb
var morgan = require('morgan');                    //log requests to console
var bodyParser = require('body-parser');           //pull information from HTML post(express4)
var methodOverride = require('method-override');   //simulate DELETE and PUT

//configuration

//mongoose.connect('mongodb://node:nodeuser@mongo.onmodulus.net:27017/uwO3mypu');
mongoose.connect('mongodb://localhost/trial');

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());

// define model
var Todo = mongoose.model('Todo', {text:String});


// routes

//get all todos
app.get('/api/todos', function(req, res){

    //use mongoose to get all todos in the database
    Todo.find(function(err, todos){
        if(err){ res.send(err);}
        res.json(todos);
    });
});

//create todo and send back all the todos after creation
app.post('/api/todos', function(req, res){

    // create a todo, information comes from AJAX request from Angular
    Todo.create({
        text: req.body.text,
        done: false
    }, function(err, todo){
        if(err){ res.send(err); }

        //get and return all the todos after you create another
        Todo.find(function(err, todos){
            if(err){
                res.send(err);
            }
            res.json(todos);
        });
    });
});

// delete a todo
app.delete('/api/todos/:todo_id', function(req, res) {
    Todo.remove({
        _id : req.params.todo_id
    }, function(err, todo) {
        if (err)
            res.send(err);

        // get and return all the todos after you create another
        Todo.find(function(err, todos) {
            if (err)
                res.send(err)
            res.json(todos);
        });
    });
});

// route to index
app.get('*', function(req, res){
    res.sendFile('./public/index.html');
});

// listen
app.listen(3000);
console.log("App listening on port 3000");
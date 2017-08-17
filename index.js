const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const app = express();
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({extended: false}))
app.use(expressValidator());
const todos = [];
const completed = [];


app.get("/", (req,res) =>{
  res.render('index', {todos: todos, completed: completed});

});

app.post("/", (req, res) => {
  console.log( req.body );
  var idx = todos.indexOf( req.body.todoList );
  if( idx === -1){
    todos.push(req.body.todoList);
  }else{
    console.log("Duplicate Task Not Allowed");
  }
  console.log(todos);
  res.redirect('/');
});

app.post("/complete", (req,res) =>{
  console.log(req.body.task);
  completed.push( req.body.task);
  var idx = todos.indexOf( req.body.task );
  if( idx > -1){
    todos.splice(idx, 1);
  }
  console.log(completed);
  res.redirect('/');
  //res.send(req.body.task);
  //console.log("gee");

});



app.listen(3000);

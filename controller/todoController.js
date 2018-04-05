const bodyparser = require('body-parser');
const mongoose = require('mongoose');

//Connect to database
mongoose.connect('mongodb://admin:admin@ds161336.mlab.com:61336/todo');

//Create a Schema
const todoSchema = new mongoose.Schema({
  item: String
});

//Create a model
const todo = mongoose.model('Todo', todoSchema);

var urlencodedParser = bodyparser.urlencoded({ extended: false });

module.exports = (app) => {

  //request for home page
  app.get('/todo', (req, res) => {
    //get data from mongo db and pass it to view
    todo.find({}, (err, data) => {
      if(err) throw err;
      res.render('todo', {todos: data});
    });
  });

  //add an item
  app.post('/todo', urlencodedParser, (req, res) => {
    //get data from the view and add it to database
    var newTodo = todo(req.body).save((err, data) => {
      if(err) throw err;
      res.json(data);
    });
  });

  //delete an item
  app.delete('/todo/:item', (req, res) => {
    //delete the requested item from database
    todo.find({item: req.params.item.replace(/\-/g,' ')}).remove((err, data) => {
      if(err) throw err;
      res.json(data);
    });
  });

};

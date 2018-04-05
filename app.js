const express = require('express');
const todoController = require('./controller/todoController');

const app = express();

//set up template engine
app.set('view engine', 'ejs');

//static files
app.use(express.static('./public'));

//fire todoController
todoController(app);

//listen to a port
app.listen(3000);

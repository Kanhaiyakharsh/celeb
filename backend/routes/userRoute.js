const express = require("express");
// const user_route = express();

const user_route = express.Router();


const bodyParser= require('body-parser');
user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({extended:true}));

// const userController = require('../controllers/userController');
const userController = require('../controllers/userController');
user_route.post('/send-message', userController.sendMessage);

module.exports = user_route;
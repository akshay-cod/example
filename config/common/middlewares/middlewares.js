const cors = require("cors");
const express = require("express");
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
//const swaggerDocument = require('./swagger.json');
const { options } = require("../../documentation/Swagger");

exports.configureCommonMiddleWares = async (app) =>
{ 
   require("dotenv").config();
   app.use('/documentation', swaggerUi.serve, swaggerUi.setup({}, options));
   app.use(cors());
   app.use(express.json());
}
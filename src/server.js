const cluster = require('cluster');
const totalCPUs = require('os').cpus().length;
cluster.schedulingPolicy = cluster.SCHED_RR;
if (cluster.isMaster) {
    console.log(`Number of CPUs is ${totalCPUs}`);
    console.log(`Master ${process.pid} is running`);
  
    // Fork workers.
    for (let i = 0; i < 1; i++) {
      cluster.fork();
    }
  
    cluster.on('exit', (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died`);
      console.log("Let's fork another worker!");
      cluster.fork();
    });
  
  } else {

const express = require("express");
const morgan = require("morgan")
const { connectToMongodb } = require("../config/database/dataBaseConnection");
const { configureCommonMiddleWares } = require("../config/common/middlewares/middlewares");
// const { initialiseSocket } = require("../services/socket/socket");
const { startServer } = require("../config/server/startServer");
const { serveStaticFiles } = require("../config/common/static/serveStaicFiles")

const app = express();

const userRoutes  = require('./User/auth/auth.route');
const categoryRoutes = require('./gift-cards/category/category.route');
const itemsRoutes = require('./gift-cards/items/items.route');
const reviewsRoutes = require('./gift-cards/user-reviews/user-reviews.route');

//app.use(audit())
// app.use((req, res, next)=>{
//   console.log(process.pid)
//   next()
// })
serveStaticFiles(app);
configureCommonMiddleWares(app);
app.use(morgan(':status :method :url :response-time :req[body]'))
connectToMongodb();



app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', itemsRoutes);
app.use('/api', reviewsRoutes);

startServer(app);

//initialiseSocket(server);
}
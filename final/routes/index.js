/**
 * @author warri
 */
var routerManager=require("./router");
var bodyParser = require('body-parser');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
module.exports = function(app) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true })); 
  app.use("/",routerManager);
  app.use("*", (req, res) => {
        res.sendStatus(404);
  })
};
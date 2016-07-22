/*Program Title: routes/index.js
Author: Kathy Chowaniec
Course: CS546-WS
Date: 07/20/2016
Description:
This module directs the routes to the form file
*/

const formRoutes = require("./form");

const constructorMethod = (app) => {
    app.use("/", formRoutes);

    //for any other routes, redirect to static client page
    app.use("*", (req, res) => {
        res.redirect("/client");
    })
};

module.exports = constructorMethod;
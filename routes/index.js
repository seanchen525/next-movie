const profileRoutes = require("./profile");
const playlistRoutes = require("./playlist");

const constructorMethod = (app) => {
    app.use("/profile", profileRoutes);
    app.use("/playlist", playlistRoutes);

    //for any other routes, redirect to static client page
    app.use("*", (req, res) => {
       // res.redirect("/client");
    });
};

module.exports = constructorMethod;
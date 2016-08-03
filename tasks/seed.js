const dbConnection = require("../config/mongoConnection");
const data = require("../data/");
const users = data.users;
const playlist = data.playlist;

dbConnection().then(db => {
    return db.dropDatabase().then(() => {
        return dbConnection;
    }).then((db) => {
        console.log("seeding db");
        return users.addUser("ilovemovies", "Kathy Chowaniec", "kchowani@stevens.edu");
    }).then((user) => {
        return playlist.addPlaylist("Kathy's Awesome Playlist", user.profile);
    }).then((newData) => {
        console.log(newData);
        console.log("Done seeding database");
        db.close();
    });
}, (error) => { //there was an error
    console.error(error);
});
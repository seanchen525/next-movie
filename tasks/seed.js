const dbConnection = require("../config/mongoConnection");
const data = require("../data/");
const users = data.users;
const playlist = data.playlist;
const movie = data.movie;

var https = require("https");
var pathTail = "?api_key=4b9df4187f2ee368c196c4a4247fc1aa";
var restHost = "https://api.themoviedb.org/3";

var listOfMovie = [];

dbConnection().then(db => {
    return db.dropDatabase().then(() => {
        return dbConnection;
    }).then((db) => {
        console.log("seeding db");
        return users.addUser("ilovemovies", "welcome", "Kathy Chowaniec", "kchowani@stevens.edu");
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

// new Promise((fulfill, reject) => {
//     https.get(restHost + "/movie/popular" + pathTail + "&page=1", (res) => {
//         res.setEncoding('utf8');
//         var _data = '';
//         res.on('data', (d) => {
//             _data += d;
//         });
//         res.on('end', () => {
//             var rs = JSON.parse(_data).results;
//             fulfill(rs);
//         });
//     });
// }).then((movieList) => {
//     for (var i = 0; i < movieList.length; i++) {
//         var newMovie = {};
//         newMovie.id = movieList[i].id;
//         listOfMovie.push(newMovie);
//     }
// }).then(() => {
//     for (var i = 0; i < listOfMovie.length; i++) {
//         movie.getMovieDetailsById(listOfMovie[i]).then((movieObj) => {
//             delete movieObj.id;
//             movie.addMovie(movieObj);
//         });
//     }
// });

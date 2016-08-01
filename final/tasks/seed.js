const data = require("../data/");
const movie = data.movie;

var https = require("https");
var pathTail = "?api_key=4b9df4187f2ee368c196c4a4247fc1aa";
var restHost = "https://api.themoviedb.org/3";

var listOfMovie = []; 

new Promise((fulfill, reject) => {
    https.get(restHost + "/movie/popular" + pathTail + "&page=1", (res) => {
        res.setEncoding('utf8');
        var _data = '';
        res.on('data', (d) => {
            _data += d;
        });
        res.on('end', () => {
            var rs = JSON.parse(_data).results;
            fulfill(rs);
        });
    });
}).then((movieList) => {
    for (var i = 0; i < movieList.length; i++){
        let movie_id = movieList[i].id;
        var newMovie = {};
        newMovie.id = movie_id;
        newMovie.title = movieList[i].title;
        newMovie.description = movieList[i].overview;
        newMovie.releaseDate = movieList[i].release_date;
        newMovie.averageRating = movieList[i].vote_average;
        newMovie.keywords = [];
        listOfMovie.push(newMovie);
    }
}).then(() => {
    for (var i = 0; i < listOfMovie.length; i++){
        movie.getMovieDetailsById(listOfMovie[i]).then((movieObj) => {
            delete movieObj.id;
            movie.addMovie(movieObj);
        });
    }
});

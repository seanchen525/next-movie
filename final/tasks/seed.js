const dbConnection = require("../config/mongoConnection");
const uuid = require("node-uuid");
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
    for (var i = 0; i < 9; i++){//listOfMovie.length
        
        if (i == 10){
            pathTail = "";//change api key 
        }
        
        loopMovies(i);
    }
});

function loopMovies(index){
    return new Promise((fulfill, reject) => {
        https.get(restHost + "/movie/" + listOfMovie[index].id + "/keywords" + pathTail, (res) => {
            res.setEncoding('utf8');
            var _data = '';
            res.on('data', (d) => {
                _data += d;
            });
            res.on('end', () => {
                var rs = JSON.parse(_data).keywords;
                var keywordVal = [];
                for (var i = 0; i < rs.length; i++){
                    keywordVal.push(rs[i].name);
                }
                listOfMovie[index].keywords = keywordVal;
                fulfill(rs);
            });
        }); 
    }).then(() => {
        return new Promise((fulfill, reject) => {
            https.get(restHost + "/movie/" + listOfMovie[index].id + pathTail, (res) => {
                res.setEncoding('utf8');
                var _data = '';
                res.on('data', (d) => {
                    _data += d;
                });
                res.on('end', () => {
                    var rs = JSON.parse(_data);
                    var genreVal = [];
                    for (var i = 0; i < rs.genres.length; i++){
                        genreVal.push(rs.genres[i].name);
                    }
                    listOfMovie[index].genre = genreVal;
                    listOfMovie[index].runtime = rs.runtime;
                    fulfill(rs);
                });
            }); 
        });
    }).then(() => {
        return new Promise((fulfill, reject) => {
            https.get(restHost + "/movie/" + listOfMovie[index].id + "/credits" + pathTail, (res) => {
                res.setEncoding('utf8');
                var _data = '';
                res.on('data', (d) => {
                    _data += d;
                });
                res.on('end', () => {
                    var rs = JSON.parse(_data);
                    var castVal = [];
                    for (var i = 0; i < rs.cast.length; i++){
                        castVal.push(rs.cast[i].name);
                    }
                    listOfMovie[index].cast = castVal;
                    
                    for (var i = 0; i < rs.crew.length; i++){
                        if (rs.crew[i].job == "Director"){
                            listOfMovie[index].director = rs.crew[i].name;
                        }
                    }
                    fulfill(rs);
                });
            }); 
        });
    }).then(() => {
        return new Promise((fulfill, reject) => {
            https.get(restHost + "/movie/" + listOfMovie[index].id + "/release_dates" + pathTail, (res) => {
                res.setEncoding('utf8');
                var _data = '';
                res.on('data', (d) => {
                    _data += d;
                });
                res.on('end', () => {
                    var rs = JSON.parse(_data).results;
                    for (var i = 0; i < rs.length; i++){
                        if (rs[i].iso_3166_1 == "US"){
                            listOfMovie[index].rated = rs[i].release_dates[0].certification;
                        }
                    }
                    fulfill(rs);
                });
            }); 
        });
    }).then(() => {
        delete listOfMovie[index].id;
        movie.addMovie(listOfMovie[index]);
    });
}

/*
var paramObj = {
    "keywords": "397",
    "genres": "12|28"
};
movie.getMovieByMultiParams(paramObj).then((rs) => {
    console.log(rs);
});
*/
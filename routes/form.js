/*Program Title: routes/form.js
Author: Kathy Chowaniec
Course: CS546-WS
Date: 07/20/2016
Description:
This module exports the routes for both the client and server forms
*/
const express = require('express');
const router = express.Router();
const data = require("../data");
const form = data.form;
const playlist = data.playlist;
const user = data.users;
let userId = " ";
let listId = " ";

router.get("/playlist/:playlistId", (req, res) => {
    //get playlist information
    let playlistId = req.params.playlistId;
    listId = playlistId;
    let info = playlist.getPlaylistById(playlistId);
    info.then((result) => {
        let viewed = [];
        let unviewed = [];
        for (var i = 0; i < result.playlistMovies.length; i++) {
            if (result.playlistMovies[i].viewed == true) {
                viewed.push(result.playlistMovies[i]);
            }
            else {
                unviewed.push(result.playlistMovies[i]);
            }
        }
        res.render("playlist/page", {
            playlist: result,
            movies: result.playlistMovies,
            viewed: viewed,
            unviewed: unviewed,
            partial: "playlist-script"
        });
    });
});

router.put("/playlist/:playlistId", (req, res) => {
    //method to clear out playlist
    let playlistId = req.params.playlistId;
    let clearList = playlist.clearPlaylist(playlistId);
    clearList.then((emptyList) => {
        res.sendStatus(200);
    });
});


router.put("/playlist/movie/:movieId", (req, res) => {
    console.log("flagged movie");
    let movieId = req.params.movieId;
    console.log(listId);
    let markMovie = playlist.checkOffMovie(listId, movieId);
    markMovie.then((result) => {
        res.sendStatus(200);
    });
});


router.delete("/playlist/movie/:movieId", (req, res) => {
    let movieId = req.params.movieId;
    console.log(listId);
    let removeMovie = playlist.removeMovieByMovieId(listId, movieId);
    removeMovie.then((result) => {
        res.sendStatus(200);
    });
});

router.post("/playlist/:movieId", (req, res) => {
    let movieId = req.params.movieId;
    let playlistId = req.params.playlistId;
    let movie = form.getMovieDetails(movieId);
    movie.then((details) => {
        let title = details.title;
        let overview = details.overview;
        let playlistInfo = playlist.getPlaylistByUserId(userId);
        playlistInfo.then((playlistId) => {
            let newList = playlist.addMovieToPlaylist(playlistId._id, movieId, title, overview);
            newList.then((addedMovie) => {
                console.log(addedMovie);
            });
        });
    }).catch((error) => {
        console.error(error);
    });
});


router.get("/profile/:userId", (req, res) => {
    userId = req.params.userId;
    res.render("profile/preferences", {
        partial: "form-validation"
    });
});

router.get("/reviews/:movieId", (req, res) => {
    let id = req.params.movieId;
    let reviews = form.getMovieReviews(id);
    reviews.then((result) => {
        //  console.log(result.results);
        res.send(result.results);
    });
});

router.get("/details/:movieId", (req, res) => {
    let id = req.params.movieId;
    let details = form.getMovieDetails(id);
    details.then((result) => {
        let credits = form.getMovieCredits(id).then((data) => {
            let mainCast = [];
            for (var i = 0; i < data.cast.length; i++) {
                if (data.cast[i].order <= 6) {
                    mainCast.push(data.cast[i].name);
                }
            }
            let directors = [];
            for (var i = 0; i < data.crew.length; i++) {
                if (data.crew[i].job == 'Director') {
                    directors.push(data.crew[i].name);
                }
            }

            let genres = [];
            for (var i = 0; i < result.genres.length; i++) {
                genres.push(result.genres[i].name);
            }
            let output = {
                title: result.title,
                date: result.release_date,
                genres: genres,
                overview: result.overview,
                runtime: result.runtime,
                number_votes: result.vote_count,
                average_rating: result.vote_average,
                mainCast: mainCast,
                directors: directors
            };
            res.send(output);
        });
    });
});


//matches POST /serverform route and creates model passing results and errors(if exist)
router.post("/profile/:userId", (req, res) => {
    let title = req.body.title;
    let actors = req.body.actors;
    let genres = req.body.genre;
    let director = req.body.director;
    let rating = req.body.rating;
    let evaluation = req.body.evaluation;
    let year = parseInt(req.body.releaseYear);
    let keywords = req.body.keywords;

    let result;
    let criteria;
    let total;
    let movielist;
    let parseActors = [];
    let actorIds = [];
    let keywordIds = [];
    let directorId;
    let parseWords = [];
    let parseGenre = [];
    let parseRating;

    if (actors) {
        parseActors = actors.split(',');
        if (parseActors.length == 0) {
            parseActors.push(actors);
        }
        let actorIds = form.getActorIds(parseActors);
        console.log(actorIds);
    }

    if (director) {
        directorId = form.getPersonIdByName(director);
        directorId.then((id) => {
            directorId = id;
        });
    }
    if (keywords) {
        parseWords = keywords.split(',');
        if (parseWords.length == 0) {
            parseWords.push(keywords);
        }
        // console.log(parseWords);
        let keywordIds = form.getKeywordIds(parseWords);
    }

    if (rating) parseRating = rating;

    if (genres) {
        if (typeof genres === "object") {
            for (var i = 0; i < genres.length; i++) {
                parseGenre.push(parseInt(genres[i]));
            }
        }
        else {
            parseGenre.push(parseInt(genres));
        }
    }
    if (title) {
        result = form.searchByTitle(title);
        result.then((movies) => {
            movielist = movies.results;
            for (var i = 0; i < movielist.length; i++) {
                if (!movielist[i].release_date == '') {
                    let parsedDate = Date.parse(movielist[i].release_date);
                    let newDate = new Date(parsedDate);
                    movielist[i].release_date = newDate.toDateString();
                }
            }
            total = movies.total_results;
            res.render("results/movielist", { movies: movielist, total: total, partial: "results-script" });
        }).catch((e) => {
            res.render("profile/preferences", {
                title: title, actors: actors, genres: genre, director: director,
                evaluation: evalution, rating: rating, releaseYear: year, keywords: keywords, error: e, partial: "form-validation"
            });
        });
    }
    else {
        criteria = form.createSearchString(actorIds, parseGenre, directorId, parseRating, evaluation, year, keywordIds);
        //  console.log(criteria);
        result = form.searchByCriteria(criteria);
        result.then((movies) => {
            movielist = movies.results;

            if (directorId) {
                //filter results for director

            }

            for (var i = 0; i < movielist.length; i++) {
                if (!movielist[i].release_date == '') {
                    let parsedDate = Date.parse(movielist[i].release_date);
                    let newDate = new Date(parsedDate);
                    movielist[i].release_date = newDate.toDateString();
                }
            }
            total = movies.total_results;
            res.render("results/movielist", { movies: movielist, total: total, partial: "results-script" });
        }).catch((e) => {
            res.render("profile/preferences", {
                title: title, actors: actors, genres: genre, director: director,
                evaluation: evalution, rating: rating, releaseYear: year, keywords: keywords, error: e, partial: "form-validation"
            });
        });
    }

});

module.exports = router;
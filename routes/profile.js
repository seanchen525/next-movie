const express = require('express');
const router = express.Router();
const data = require("../data");
const form = data.form;
const api = data.api;
const user = data.users;
let userId = " ";

router.get("/:userId", (req, res) => {
    userId = req.params.userId;
    res.render("profile/preferences", {
        partial: "form-validation"
    });
});


router.post("/:userId", (req, res) => {
    let title = req.body.title;
    let actors = req.body.actors;
    let genres = req.body.genre;
    let director = req.body.director;
    let rating = req.body.rating;
    let evaluation = req.body.evaluation;
    let year = parseInt(req.body.releaseYear);
    let keywords = req.body.keywords;

    let parseActors = [];
    let actorIds = [];
    let keywordIds = [];
    var directorId;
    let parseWords = [];
    let parseGenre = [];

    if (actors) {
        parseActors = actors.split(',');
        if (parseActors.length == 0) {
            parseActors.push(actors);
        }
        let actorIds = form.getActorIds(parseActors);
        console.log(actorIds);
    }

    if (director) {
        //let id = api.getPersonIdByName(director);
        // id.then((director) => {
        //     directorId = director.results[0].id;
        // });
        form.getDirectorId(director);
        directorId = form.getDId();
        console.log(directorId);
    }
    if (keywords) {
        parseWords = keywords.split(',');
        if (parseWords.length == 0) {
            parseWords.push(keywords);
        }
        // console.log(parseWords);
        let keywordIds = form.getKeywordIds(parseWords);
    }

    if (genres) {
        if (typeof genres === "object") { //multiple genres selected
            for (var i = 0; i < genres.length; i++) {
                parseGenre.push(parseInt(genres[i]));
            }
        }
        else { //just one genre selected
            parseGenre.push(parseInt(genres));
        }
    }

    //SEARCH BY MOVIE TITLE
    if (title) {
        let result = api.searchByTitle(title);
        result.then((movies) => {
            let movielist = form.formatReleaseDate(movies.results);
            let total = movies.total_results;
            res.render("results/movielist", { userId: userId, movies: movielist, total: total, partial: "results-script" });
        }).catch((e) => {
            res.render("profile/preferences", {
                title: title, actors: actors, genres: genre, director: director,
                evaluation: evalution, rating: rating, releaseYear: year, keywords: keywords, error: e, partial: "form-validation"
            });
        });
    }

    //SEARCH BY CRITERIA
    else {
        let criteria = api.createSearchString(actorIds, parseGenre, directorId, rating, evaluation, year, keywordIds);
        console.log(criteria);
        let result = api.searchByCriteria(criteria);
        result.then((movies) => {
            // if (directorId) {
            //     //filter results for director
            //     let movielist = form.filterForDirector(directorId, movies.results, movies.total_results);
            // }
            // else {
            let movielist = form.formatReleaseDate(movies.results);
            let total = movies.total_results;
            //    }
            res.render("results/movielist", { userId: userId, movies: movielist, total: total, partial: "results-script" });
        }).catch((e) => {
            res.render("profile/preferences", {
                title: title, actors: actors, genres: genre, director: director,
                evaluation: evalution, rating: rating, releaseYear: year, keywords: keywords, error: e, partial: "form-validation"
            });
        });
    }

});

module.exports = router;
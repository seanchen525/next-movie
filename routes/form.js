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


router.get("/profile", (req, res) => {
    res.render("profile/preferences", {});
});

//matches POST /serverform route and creates model passing results and errors(if exist)
router.post("/profile", (req, res) => {
    let title = req.body.title;
    let actors = req.body.actors;
    let genres = req.body.genre;
    let directors = req.body.director;
    let ratings = req.body.ratings;
    let year = parseInt(req.body.releaseYear);
    let keywords = req.body.keywords;
    let result;
    let criteria;
    let list;
    let total;
    let movielist;

    let parseActors = [];
    let parseDirectors = [];
    let parseWords = [];
    let parseGenre = [];
    let parseRatings = [];

    if (actors) parseActors = actors.split(',');
    if (directors) parseDirectors = directors.split(',');
    if (keywords) parseWords = keywords.split(',');

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

    if (ratings) {
        for (var i = 0; i < ratings.length; i++) {
            parseRatings.push(parseInt(ratings[i]));
        }
    }

    try {
        if (title) {
            result = form.searchByTitle(title);
            result.then((movies) => {
                movielist = movies.result;
                total = movies.total_results;
                res.render("results/movielist", { movies: movielist, total: total });
            });
        }
        else {
            criteria = form.createSearchString(parseActors, parseGenre, parseDirectors, parseRatings, year, parseWords);
            console.log(criteria);
            result = form.searchByCriteria(criteria);
            result.then((movies) => {
                movielist = movies.result;
                total = movies.total_results;
                res.render("results/movielist", { movies: movielist, total: total });
            });
        }

    } catch (e) { //error occurred
        //render server form passing error
        // res.render("form/server", { content: content, inputString: inputString, insertValue: insertNum, betweenValue: betweenNum, error: e });
        //render profile page
        return;
    }
});

module.exports = router;
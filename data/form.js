/*Program Title: data/form.js
Author: Kathy Chowaniec
Course: CS546-WS
Date: 07/20/2016
Description:
This module exports the validation and computation methods for the text manipulation functionality for the server form. 
*/

var https = require("https");
var pathTail = "?api_key=4b9df4187f2ee368c196c4a4247fc1aa";
var imgHost = "https://image.tmdb.org/t/p/w300_and_h450_bestv2";
var restHost = "https://api.themoviedb.org/3";
let ids = [];

let exportedMethods = {
    createSearchString(actors, genre, director, rating, evaluation, year, keywords) {
        let query = "";
        if (rating) query = query + "&certification_country=US";
        if (evaluation === "equal") {
            query = query + "&certification=" + rating;
        } else if (evaluation === "lte") {
            query = query + "&certification.lte=" + rating;
        }
        if (year) {
            query = query + "&primary_release_year=" + year;
        }
        if (genre.length > 0) query = query + "&with_genres=" + genre.join('|');
        if (keywords.length > 0) query = query + "&with_keywords=" + keywords.join('|');
        if (actors.length > 0) query = query + "&with_cast=" + actors.join('|');
        if (director) query = query + "&with_crew=" + director;

        query = query + "&sort_by=vote_average.desc"; //sort results by movies with highest rating
        return query;
    },
    getMovieDetails(movieId) {
        return new Promise((fulfill, reject) => {
            https.get(restHost + "/movie/" + movieId + pathTail, function (response) {
                response.setEncoding('utf8');
                var body = '';
                response.on('data', function (d) {
                    body += d;
                });
                response.on('error', (e) => {
                    reject(e);
                });
                response.on('end', function () {
                    var parsed = JSON.parse(body);
                    fulfill(parsed);
                });
            });
        });
    },
    getMovieReviews(movieId) {
        return new Promise((fulfill, reject) => {
            https.get(restHost + "/movie/" + movieId + "/reviews" + pathTail, function (response) {
                response.setEncoding('utf8');
                var body = '';
                response.on('data', function (d) {
                    body += d;
                });
                response.on('error', (e) => {
                    reject(e);
                });
                response.on('end', function () {
                    var parsed = JSON.parse(body);
                    fulfill(parsed);
                });
            });
        });
    },
    getMovieCredits(movieId) {
        return new Promise((fulfill, reject) => {
            https.get(restHost + "/movie/" + movieId + "/credits" + pathTail, function (response) {
                response.setEncoding('utf8');
                var body = '';
                response.on('data', function (d) {
                    body += d;
                });
                response.on('error', (e) => {
                    reject(e);
                });
                response.on('end', function () {
                    var parsed = JSON.parse(body);
                    fulfill(parsed);
                });
            });
        });
    },

    getPersonIdByName(personName) {
        return new Promise((fulfill, reject) => {
            https.get(restHost + "/search/person" + pathTail + "&query=" + personName + "&include_adult=false", function (response) {
                response.setEncoding('utf8');
                var body = '';
                response.on('data', function (d) {
                    body += d;
                });
                response.on('error', (e) => {
                    reject(e);
                });
                response.on('end', function () {
                    var parsed = JSON.parse(body);
                    fulfill(parsed);
                });
            });
        });
    },
    getKeywordIdByName(keyword) {
        return new Promise((fulfill, reject) => {
            https.get(restHost + "/search/keyword" + pathTail + "&query=" + keyword, function (response) {
                response.setEncoding('utf8');
                var body = '';
                response.on('data', function (d) {
                    body += d;
                });
                response.on('error', (e) => {
                    reject(e);
                });
                response.on('end', function () {
                    var parsed = JSON.parse(body);
                    fulfill(parsed);
                });
            });
        });
    },
    getKeywordIds(keywords) {
        let ids = [];
        for (var i = 0; i < keywords.length; i++) {
            let wordId = this.getKeywordIdByName(keywords[i]);
            wordId.then((keywordId) => {
                if (keywordId.total_results > 0) {
                    ids.push(keywordId.results[0].id);
                }
            });
        }
        return ids;
    },
    getActorIds(actors) {

        let ids = [];
        for (var i = 0; i < actors.length; i++) {
            let id = this.addId(actors[i], i, actors);
            id.then((newId) => {
                console.log(newId);
                ids.push(newId);
            });
        }

        // ids.push(id);
        console.log(ids);
        return ids;
    },

    addId(current, index, array) {
        return exportedMethods.getPersonIdByName(array[index]).then((personId) => {
            console.log(personId);
            if (personId.total_results > 0) {
                return personId.results[0].id;
            }
            else {
                return;
            }
        });
    },
    searchByTitle(title) {
        return new Promise((fulfill, reject) => {
            https.get(restHost + "/search/movie" + pathTail + "&query=" + title + "&include_adult=false", function (response) {
                response.setEncoding('utf8');
                var body = '';
                response.on('data', function (d) {
                    body += d;
                });
                response.on('error', (e) => {
                    reject(e);
                });
                response.on('end', function () {
                    var parsed = JSON.parse(body);
                    fulfill(parsed);
                });
            });
        });
    },
    searchByCriteria(searchString) {
        return new Promise((fulfill, reject) => {
            https.get(restHost + "/discover/movie" + pathTail + searchString, function (response) {
                response.setEncoding('utf8');
                var body = '';
                response.on('data', function (d) {
                    body += d;
                });
                response.on('error', (e) => {
                    reject(e);
                });
                response.on('end', function () {
                    var parsed = JSON.parse(body);
                    fulfill(parsed);
                });
            });
        });
    }
}

module.exports = exportedMethods; //export methods
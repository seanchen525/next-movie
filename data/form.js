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

let exportedMethods = {
    createSearchString(actor, genre, director, rating, year, keywords) {
        let query = "";
        if (year) query = query + "&primary_release_year=" + year;
        if (genre.length > 0) query = query + "&with_genres=" + genre.join('|');
        if (keywords.length > 0) query = query + "&with_keywords=" + keywords.join('|');

        return query;
    },
    searchByTitle(title) {
        return new Promise((fulfill, reject) => {
            https.get(restHost + "/search/movie" + pathTail + "&query=" + title, function (response) {
                response.setEncoding('utf8');
                var body = '';
                response.on('data', function (d) {
                    body += d;
                });
                response.on('error', (e) => {
                    reject();
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
                    reject();
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
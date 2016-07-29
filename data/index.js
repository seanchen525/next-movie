/*Program Title: data/index.js
Author: Kathy Chowaniec
Course: CS546-WS
Date: 07/20/2016
Description:
This module exports the form methods 
*/

const form = require("./form");
const users = require("./users");
const playlist = require("./playlist");
const movie = require("./movie");

module.exports = {
    form: form,
    movie: movie,
    playlist: playlist,
    users: users
};
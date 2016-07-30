const express = require('express');
const router = express.Router();
const data = require("../data");
const api = data.api;
const playlist = data.playlist;
const user = data.users;
const profile = data.profile;
let listId = " ";

router.get("/:playlistId", (req, res) => {
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

router.delete("/:playlistId", (req, res) => {
    //method to clear out playlist
    let playlistId = req.params.playlistId;
    let clearList = playlist.clearPlaylist(playlistId);
    clearList.then((emptyList) => {
        res.json({ success: true });
    }).catch((error) => {
        res.json({ success: false, error: error });
    });
});


router.put("/movie/:movieId", (req, res) => {
    let movieId = req.params.movieId;
    console.log(listId);
    let markMovie = playlist.checkOffMovie(listId, movieId);
    markMovie.then((result) => {
        res.json({ success: true });
    }).catch((error) => {
        res.json({ success: false, error: error });
    });
});

router.get("/reviews/:movieId", (req, res) => {
    let id = req.params.movieId;
    let reviews = api.getMovieReviews(id);
    reviews.then((result) => {
        res.send(result.results);
    });
});

router.get("/details/:movieId", (req, res) => {
    let id = req.params.movieId;
    let details = api.getMovieDetails(id);
    details.then((result) => {
        let credits = api.getMovieCredits(id).then((data) => {
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

router.delete("/movie/:movieId", (req, res) => {
    let movieId = req.params.movieId;
    let removeMovie = playlist.removeMovieByMovieId(listId, movieId);
    removeMovie.then((result) => {
        res.json({ success: true });
    }).catch((error) => {
        res.json({ succes: false, error: error });
    });
});

router.post("/:userId/:movieId", (req, res) => {
    let movieId = req.params.movieId;
    let movie = api.getMovieDetails(movieId);
    let userId = req.params.userId;
    movie.then((details) => {
        let title = details.title;
        let overview = details.overview;
        let playlistInfo = playlist.getPlaylistByUserId(userId);
        playlistInfo.then((playlistId) => {
            let newList = playlist.addMovieToPlaylist(playlistId._id, movieId, title, overview);
            newList.then((addedMovie) => {
                res.json({ success: true });
            });
        });
    }).catch((error) => {
        res.json({ success: false, error: error });
    });
});

module.exports = router;
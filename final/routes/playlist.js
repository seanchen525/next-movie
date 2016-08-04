/**
 * @author warri
 */
 var express = require('express');
 var playlist=require('../data/Playlist');
 var users=require('../data/Users');
 var router = express.Router();
 
 router.get('/playlists', function (req, res) {
  	 var list=playlist.getAllPlaylist().then((Playlistlist)=>{
		if (Playlistlist) {
			res.status(200).send(Playlistlist);
		}else{
			res.sendStatus(404);
		}
	 });
  }),

  router.get('/playlists/:id', function (req, res) {
  	 playlist.getPlaylistById(req.params.id).then((PlaylistObj)=>{
		if (PlaylistObj) {
			res.status(200).send(PlaylistObj);
		}else{
			res.sendStatus(404);
		}
	 });
  }),
  
  router.get('/playlist', function (req, res) {
	 if (req.cookies.next_movie == undefined || (new Date(req.cookies.next_movie.expires) < new Date(Date.now()))) {
		 res.redirect("/login");
		 return;
	 }
	 users.getUserBySessionId(req.cookies.next_movie).then((userObj) => {
		 if (userObj != "Users not found"){
			 playlist.getPlaylistByUserId(userObj._id).then((PlaylistObj) => {
				 if (PlaylistObj != "Playlist not found") {
					//res.status(200).send(PlaylistObj);
					res.render("playlist/index", {
						playlist: PlaylistObj,
						partial: "jquery-playlist-index-scripts"
					});
				}else{
					res.sendStatus(404);
				}
			 });
		 } else {
			 res.sendStatus(404);
		 }
	 });
  }),
  
  router.post('/playlists', function (req, res) {
  	 var obj=req.body;
  	 playlist.addPlaylist(obj).then((PlaylistObj)=>{
		if (PlaylistObj) {
			res.status(200).send(PlaylistObj);
		}else{
			res.sendStatus(404);
		}
	 });
  }),
  
  router.put('/playlists/:id', function (req, res) {
  	 playlist.updatePlaylistById(req.params.id,req.body).then((PlaylistObj)=>{
		if (PlaylistObj) {
			//console.log(PlaylistObj);
			res.status(200).send(PlaylistObj);
		}else{
			res.sendStatus(404);
		}
	 });
  }),
  
  router.delete('/playlists/:id', function (req, res) {
  	  playlist.deletePlaylistById(req.params.id).then((PlaylistObj)=>{
		if (PlaylistObj) {
			res.status(200).send(PlaylistObj);
		}else{
			res.sendStatus(404);
		}
	 });
  }),

  router.post('/playlists/movie/:id', function (req, res) {
  	 playlist.addMovieToPlaylist(req.params.id,req.body).then((PlaylistObj)=>{
		if (PlaylistObj) {
			//console.log(PlaylistObj);
			res.status(200).send(PlaylistObj);
		}else{
			res.sendStatus(404);
		}
	 });
  }),

  router.get('/playlists/movie/:pid/:mid', function (req, res) {
  	 playlist.getMovieByMovieId(req.params.pid,req.params.mid).then((movieObj)=>{
		if (movieObj) {
			//console.log(PlaylistObj);
			res.status(200).send(movieObj);
		}else{
			res.sendStatus(404);
		}
	 });
  }),

  router.delete('/playlists/movie/:pid/:mid', function (req, res) {
  	 playlist.removeMovieByMovieId(req.params.pid,req.params.mid).then((playlistObj)=>{
		if (playlistObj) {
			//console.log(PlaylistObj);
			res.status(200).send(playlistObj);
		}else{
			res.sendStatus(404);
		}
	 });
  }),

  router.put('/playlists/movie/:pid/:mid', function (req, res) {
  	 playlist.updateMovieByMovieId(req.params.pid,req.params.mid,req.body).then((movieObj)=>{
		if (movieObj) {
			//console.log(PlaylistObj);
			res.status(200).send(movieObj);
		}else{
			res.sendStatus(404);
		}
	 });
  }),


 
  module.exports = router;
 
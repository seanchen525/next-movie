/**
 * @author warri
 */
 var express = require('express');
 var playlist=require('../data/Playlist')
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
  
  router.post('/playlists', function (req, res) {
  	 var obj=req.body;
  	 playlist.addPlaylistGeneral(obj).then((PlaylistObj)=>{
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
  	 playlist.addMovieToPlaylistAndMovie(req.params.id,req.body).then((movieObj)=>{
		if (movieObj) {
			//console.log(PlaylistObj);
			res.status(200).send(movieObj);
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

  router.post('/playlists/movie/review/:id/:mid', function (req, res) {
  	 playlist.addMovieReviewToPlaylistAndMovie(req.params.id,req.params.mid,req.body).then((movieObj)=>{
		if (movieObj) {
			//console.log(PlaylistObj);
			res.status(200).send(movieObj);
		}else{
			res.sendStatus(404);
		}
	 });
  })


 
  module.exports = router;
 
/**
 * @author warri
 */
 var express = require('express');
 var movies=require('../data/Movie')
 var uuid = require('node-uuid');
 var router = express.Router();
 
 router.get('/movies', function (req, res) {
  	 var list=movies.getAllMovie().then((Movielist)=>{
		if (Movielist) {
			res.status(200).send(Movielist);
		}else{
			res.sendStatus(404);
		}
	 });
  }),

  router.get('/movies/:id', function (req, res) {
  	 movies.getMovieById(req.params.id).then((MovieObj)=>{
		if (MovieObj) {
			res.status(200).send(MovieObj);
		}else{
			res.sendStatus(404);
		}
	 });
  }),
  
  router.post('/movies', function (req, res) {
  	 var obj=req.body;
  	 movies.addMovie(obj).then((MovieObj)=>{
		if (MovieObj) {
			res.status(200).send(MovieObj);
		}else{
			res.sendStatus(404);
		}
	 });
  }),
  
  router.put('/movies/:id', function (req, res) {
  	 movies.updateMovieById(req.params.id,req.body).then((MovieObj)=>{
		if (MovieObj) {
			//console.log(MovieObj);
			res.status(200).send(MovieObj);
		}else{
			res.sendStatus(404);
		}
	 });
  }),
  
  router.delete('/movies/:id', function (req, res) {
  	  movies.deleteMovieById(req.params.id).then((MovieObj)=>{
		if (MovieObj) {
			res.status(200).send(MovieObj);
		}else{
			res.sendStatus(404);
		}
	 });
  }),

    router.post('/movies/review/:id', function (req, res) {
  	 movies.addReviewToMovie(req.params.id,req.body).then((movieObj)=>{
		if (movieObj) {
			//console.log(PlaylistObj);
			res.status(200).send(movieObj);
		}else{
			res.sendStatus(404);
		}
	 });
  }),

  router.get('/movies/review/:mid/:rid', function (req, res) {
  	 movies.getReviewByReviewId(req.params.mid,req.params.rid).then((reviewObj)=>{
		if (reviewObj) {
			//console.log(PlaylistObj);
			res.status(200).send(reviewObj);
		}else{
			res.sendStatus(404);
		}
	 });
  }),

  router.delete('/movies/review/:mid/:rid', function (req, res) {
  	 movies.removeReviewByReviewId(req.params.mid,req.params.rid).then((movieObj)=>{
		if (movieObj) {
			//console.log(PlaylistObj);
			res.status(200).send(movieObj);
		}else{
			res.sendStatus(404);
		}
	 });
  }),

  router.put('/movies/review/:mid/:rid', function (req, res) {
  	 movies.updateReviewByReviewId(req.params.mid,req.params.rid,req.body).then((reviewObj)=>{
		if (reviewObj) {
			//console.log(PlaylistObj);
			res.status(200).send(reviewObj);
		}else{
			res.sendStatus(404);
		}
	 });
  }),


 
  module.exports = router;
 
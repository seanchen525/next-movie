/**
 * @author warri
 */
 var express = require('express');
 var users=require('../data/Users');
 var playlist=require('../data/Playlist');
 var router = express.Router();
 const xss = require('xss');
 
 router.get('/users', function (req, res) {
  	 var list=users.getAllUser().then((userlist)=>{
		if (userlist) {
			res.status(200).send(userlist);
		}else{
			res.sendStatus(404);
		}
	 });
  }),
  
  router.get('/login', function (req, res) {
	  res.cookie("next_movie", "", { expires: new Date(Date.now())}); 
	  res.render("layouts/login", {
		  partial: "jquery-login-scripts"
	  });
  }),

  router.get('/user', function (req, res) {
	 if (req.cookies.next_movie == undefined || (new Date(req.cookies.next_movie.expires) < new Date(Date.now()))) {
		 res.redirect("/login");
		 return;
	 }
  	 users.getUserBySessionId(req.cookies.next_movie).then((userObj)=>{
		if (userObj) {
			res.render("user/index", {
				user: userObj,
				partial: "jquery-user-index-scripts"
			});
		}else{
			res.sendStatus(404);
		}
	 });
	 
  }),
  
  router.post('/users', function (req, res) {
  	 var obj=req.body;
	 //obj["_id"]=uuid.v4();
	 //obj["profile"]["_id"]= obj["_id"];
  	 users.addUsers(obj).then((userObj)=>{
		if (userObj != "Users not found") {
			var playlistObj = {};
			playlistObj.title = "My Playlist";
			playlistObj.user = userObj.profile;
			playlistObj.playlistMovies = [];
			playlist.addPlaylist(playlistObj).then((obj) => {
				res.status(200).send(userObj);
			});
		}else{
			res.sendStatus(404);
		}
	 });
  }),
  
  router.put('/users/:id', function (req, res) {
  	 users.updateUserById(req.params.id,req.body).then((userObj)=>{
		if (userObj) {
			//console.log(userObj);
			res.status(200).send(userObj);
		}else{
			res.sendStatus(404);
		}
	 });
  }),
  
  router.delete('/users/:id', function (req, res) {
  	  users.deleteUserById(req.params.id).then((userObj)=>{
		if (userObj) {
			res.status(200).send(userObj);
		}else{
			res.sendStatus(404);
		}
	 });
  });
  
router.post('/user/login', function (req, res) {
	var userObj = {};
	userObj.username = req.body.username;
	userObj.password = req.body.password;
	//When to fire the session?
	users.verifyUser(userObj).then((user) => {
		if (user != "Users not found"){
			res.cookie("next_movie", user.sessionId, { expires: new Date(Date.now() + 24 * 3600000), httpOnly: true}); 
			res.json({ success: true });
			return;
		} else {
			res.json({ success: false, message: "username or password is invalid" });
		}
	});
}),
 
  module.exports = router;
 
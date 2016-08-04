/**
 * @author warri
 */
 var express = require('express');
 var users=require('../data/Users')
 var router = express.Router();
 
 router.get('/users', function (req, res) {
  	 var list=users.getAllUser().then((userlist)=>{
		if (userlist) {
			res.status(200).send(userlist);
		}else{
			res.sendStatus(404);
		}
	 });
  }),

  router.get('/users/:id', function (req, res) {
  	 users.getUserById(req.params.id).then((userObj)=>{
		if (userObj) {
			res.status(200).send(userObj);
		}else{
			res.sendStatus(404);
		}
	 });
  }),
  
  router.post('/users', function (req, res) {
  	 var obj=req.body;
  	 users.addUsersGeneral(obj).then((userObj)=>{
		if (userObj) {
			res.status(200).send(userObj);
		}else{
			res.sendStatus(404);
		}
	 });
  }),

  router.post('/users/playlist/:title', function (req, res) {
  	 var obj=req.body;
  	 users.addUsersAndPlaylist(req.params.title,obj).then((userObj)=>{
		if (userObj) {
			res.status(200).send(userObj);
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
  })
 
  module.exports = router;
 
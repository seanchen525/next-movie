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
	 obj["_id"]=uuid.v4();
	 obj["profile"]["_id"]= obj["_id"];
  	 users.addUsers(obj).then((userObj)=>{
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
 
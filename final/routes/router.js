/**
 * @author warri
 */
 var express = require('express');
 var users=require('../data/Users')
 var uuid = require('node-uuid');
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
 /* 
  router.get('/comments/recipe/:recipeId', function (req, res) {
  	  recipe.getCommentByRecipeId(req.params.recipeId).then((commentlist)=>{
		if (commentlist) {
			res.status(200).send(commentlist);
		}else{
			res.sendStatus(404);
		}
	  });
  }),
  
  router.get('/comments/:commentId', function (req, res) {
  	  recipe.getCommentByCommentId(req.params.commentId).then((commentlist)=>{
		if (commentlist) {
			for(var i=0;i<commentlist[0].comments.length;i++){
				if(req.params.commentId===commentlist[0].comments[i]._id){
					var obj={};
					obj['_id']=commentlist[0].comments[i]._id;
					obj['recipeId']=commentlist[0]._id;
					obj['recipeTitle']=commentlist[0].title;
					obj['name']=commentlist[0].comments[i].comment;
					obj['poster']=commentlist[0].comments[i].poster;
					break;
				}	
			}
			res.status(200).send(obj);
		}else{
			res.sendStatus(404);
		}
	  });
  }),
  
  router.post('/comments/:recipeId', function (req, res) {
  	 var obj=req.body;
	 obj["_id"]=uuid.v4();
  	 recipe.addComment(req.params.recipeId,obj).then((recipeObj)=>{
		if (recipeObj) {
			res.status(200).send(recipeObj);
		}else{
			res.sendStatus(404);
		}
	 });
  }),
  
  router.put('/comments/:recipeId/:commentId', function (req, res) {
  	 recipe.updateComment(req.params.recipeId,req.params.commentId,req.body).then((recipeObj)=>{
		if (recipeObj) {
			res.status(200).send(recipeObj);
		}else{
			res.sendStatus(404);
		}
	 });
  }),
  
  router.delete('/comments/:id', function (req, res) {
  	
	recipe.getCommentByCommentId(req.params.id).then((commentlist)=>{
		if(commentlist){
			var id=commentlist[0]._id;
			console.log(id);
			recipe.deleteCommentById(id,req.params.id).then((recipeObj)=>{
				if (recipeObj) {
					res.status(200).send(recipeObj);
				}else{
					res.sendStatus(404);
				}
	 		});
		}else{
			res.sendStatus(404);
		}
	  });
  })
 **/ 
  module.exports = router;
 
mongoCollections = require("../config/mongoCollections");
Users = mongoCollections.Users;

var exportedMethods = {
    getAllUser() {
        return Users().then((userCollection) => {
            return userCollection.find({}).toArray();
        });
    },
    // This is a fun new syntax that was brought forth in ES6, where we can define
    // methods on an object with this shorthand!
    getUserById(id) {
        return Users().then((userCollection) => {
            return userCollection.findOne({_id:id}).then((userObj) => {
                if (!userObj) throw "Users not found";
                return userObj;
            }).catch((error)=>{
				return error;
			});
        });
    },
	
	addUsers(obj) {
        return Users().then((userCollection) => {
            return userCollection.insertOne(obj).then((userObj) => {
               return userObj.insertedId;
            }).then(newId=>{
				return this.getUserById(newId);
			});
        });
    },
	
	deleteUserById(id){
		return Users().then((userCollection) => {
            return userCollection.deleteOne({ _id: id }).then(function(deletionInfo) {
            	if(deletionInfo.deletedCount === 0) throw "Could not find the document with this id to delete";
				return true;
        	});
        }).catch((error)=>{
			return error;
		})
	},
	  
    updateUserById(id,obj){
		return Users().then((userCollection) => {
            return userCollection.update({ _id: id },{$set:obj}).then(function() {
				//console.log(typeof this.getRecipeById(id));
            	return id;
        	});
        }).then(id=>{
			return this.getUserById(id);
		}).catch((error)=>{
			return error;
		})
	}

	/*
	
	getCommentByRecipeId(id){
		return recipe().then((recipeCollection) => {
            return recipeCollection.findOne({ _id: id }).then(function(recipeObj) {
				if(!recipeObj) throw "Could not find the document with this id";
            	var commentlist=recipeObj.comments;
				var array=[];
				for(var i=0;i<commentlist.length;i++){
					var obj={};
					obj['_id']=commentlist[i]._id;
					obj['recipeId']=recipeObj._id;
					obj['recipeTitle']=recipeObj.title;
					obj['name']=commentlist[i].comment;
					obj['poster']=commentlist[i].poster;
					array[i]=obj;
				}
            	return array;
        	});
        }).catch((error)=>{
			return {error:error};
		})
	},
	
	getCommentByCommentId(id){
		return recipe().then((recipeCollection) => {
            return recipeCollection.find({ "comments._id":id }).toArray();
        }).catch((error)=>{
			return {error:error};
		})
	},
	
	addComment(id,obj){
		return recipe().then((recipeCollection) => {
            return recipeCollection.update({ _id: id }, { $push: { "comments": obj } }).then(function() {
                return obj;
            }).catch((error)=>{
				return {error:error};
			});
        })
	},
	
	updateComment(rid,cid,obj){
		return recipe().then((recipeCollection) => {
            return recipeCollection.update({ _id: rid,comments:{$elemMatch: {_id:cid }}}, { $set: { "comments.$": obj } }).then(function() {
                return obj;
            }).catch((error)=>{
				return {error:error};
			});
        })
	},
	
	deleteCommentById(id,cid){
		return recipe().then((recipeCollection) => {
            return recipeCollection.update({ _id: id }, { $pull: { "comments": { _id: cid } } }).then(function() {
                return "sucess";
            }).catch((error)=>{
				return {error:error};
			});
        })
	}  **/
}

module.exports = exportedMethods;
mongoCollections = require("../config/mongoCollections");
Users = mongoCollections.Users;
var uuid = require('node-uuid');

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
        	obj["_id"]=uuid.v4();
            obj["profile"]["_id"]= obj["_id"];
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

}

module.exports = exportedMethods;
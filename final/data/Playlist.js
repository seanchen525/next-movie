mongoCollections = require("../config/mongoCollections");
Playlist = mongoCollections.Playlist;
var uuid = require('node-uuid');

var exportedMethods = {
    getAllPlaylist() {
        return Playlist().then((playlistCollection) => {
            return playlistCollection.find({}).toArray();
        });
    },
    // This is a fun new syntax that was brought forth in ES6, where we can define
    // methods on an object with this shorthand!
    getPlaylistById(id) {
        return Playlist().then((playlistCollection) => {
            return playlistCollection.findOne({_id:id}).then((playlistObj) => {
                if (!playlistObj) throw "Playlist not found";
                return playlistObj;
            }).catch((error)=>{
				return error;
			});
        });
    },
	
	addPlaylist(obj) {
        return Playlist().then((playlistCollection) => {
            obj["_id"]=uuid.v4();
            return playlistCollection.insertOne(obj).then((playlistObj) => {
               return playlistObj.insertedId;
            }).then(newId=>{
				return this.getPlaylistById(newId);
			});
        });
    },
	
	deletePlaylistById(id){
		return Playlist().then((playlistCollection) => {
            return playlistCollection.deleteOne({ _id: id }).then(function(deletionInfo) {
            	if(deletionInfo.deletedCount === 0) throw "Could not find the document with this id to delete";
				return true;
        	});
        }).catch((error)=>{
			return error;
		})
	},
	  
    updatePlaylistById(id,obj){
		return Playlist().then((playlistCollection) => {
            return playlistCollection.update({ _id: id },{$set:obj}).then(function() {
				//console.log(typeof this.getRecipeById(id));
            	return id;
        	});
        }).then(id=>{
			return this.getPlaylistById(id);
		}).catch((error)=>{
			return error;
		})
	},

    addMovieToPlaylist(id,obj) {   //add movie to the playlistMovies array by providing playlist id and the movie object.Node:the review id in the movie should be added first
        return Playlist().then((playlistCollection) => {
            //obj["review"]["_id"]=uuid.v4();
            return playlistCollection.update({ _id: id },{$addToSet:{ "playlistMovies": obj } }).then(function() {
                return id;
            }).then(id=>{
                return this.getPlaylistById(id);
            }).catch((error)=>{
                return {error:error};
            });
        });
    },

    getMovieByMovieId(pid,mid){     //get the movie from the playlist by providing the specified playlist id and the movie id
        return Playlist().then((playlistCollection)=>{
            return playlistCollection.findOne({_id:pid}).then((playlistObj)=>{
                if(!playlistObj) throw "Playlist with id "+pid+" doesn't exist!";
                var movielist=playlistObj.playlistMovies;
                console.log(movielist);
                for(var i=0;i<movielist.length;i++){
                    if(movielist[i]._id==mid) return movielist[i];
                }
                return "not find";
            }).catch((error)=>{
                return {error:error};
            });
        }).catch((error)=>{
                return {error:error};
        });

    },

    removeMovieByMovieId(pId,mId){   //delete specified movie in the playlistMovies array by providing playlist id and the movie id
        return Playlist().then((playlistCollection)=>{
            return playlistCollection.update({ _id: pId }, { $pull: { "playlistMovies": { _id: mId } } }).then(function() {
                return pId;
            }).then(id=>{
                return this.getPlaylistById(id);
            });
        }).catch((error)=>{
                return {error:error};
        });
    },

    updateMovieByMovieId(pid,mid,obj){   //delete specified movie in the playlistMovies array by providing playlist id and the movie id
        return Playlist().then((playlistCollection)=>{
            return playlistCollection.update({ _id: pid,playlistMovies:{$elemMatch: {_id:mid }}}, { $set: { "playlistMovies.$": obj } }).then(function() {
                return pid;
            }).then((pid)=>{
                return this.getMovieByMovieId(pid,mid).then((movieObj)=>{
                    return movieObj;
                });
            }).catch((error)=>{
                return {error:error};
            });
        }).catch((error)=>{
                return {error:error};
        });
    },


}

module.exports = exportedMethods;
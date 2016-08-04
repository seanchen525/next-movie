mongoCollections = require("../config/mongoCollections");
Movie = mongoCollections.Movie;
var uuid = require('node-uuid');

var exportedMethods = {
    //main operations related to movie
    getAllMovie() {
        return Movie().then((movieCollection) => {
            return movieCollection.find({}).toArray();
        });
    },
    // This is a fun new syntax that was brought forth in ES6, where we can define
    // methods on an object with this shorthand!
    getMovieById(id) {
        return Movie().then((movieCollection) => {
            return movieCollection.findOne({_id:id}).then((movieObj) => {
                if (!movieObj) throw "Movie not found";
                return movieObj;
            }).catch((error)=>{
				return error;
			});
        });
    },
	
	addMovieGeneral(obj) {
        return Movie().then((movieCollection) => {
            return movieCollection.insertOne(obj).then((movieObj) => {
               return movieObj.insertedId;
            }).then(newId=>{
				return this.getMovieById(newId);
			});
        });
    },

    addMovie(title,description,genre,rated,releaseDate,runtime,director,cast,averageRating,keywords) {
        var movieId=uuid.v4();
        var obj={
            _id:movieId,
            title:title,
            description:description,
            genre:genre,
            rated:rated,
            releaseDate:releaseDate,
            runtime:runtime,
            director:director,
            cast:cast,
            averageRating:averageRating,
            keywords:keywords,
            allReviews:[]
        };
        return Movie().then((movieCollection) => {
            return movieCollection.insertOne(obj).then((movieObj) => {
               return movieObj.insertedId;
            }).then(newId=>{
                return this.getMovieById(newId);
            });
        });
    },
	
	deleteMovieById(id){
		return Movie().then((movieCollection) => {
            return movieCollection.deleteOne({ _id: id }).then(function(deletionInfo) {
            	if(deletionInfo.deletedCount === 0) throw "Could not find the document with this id to delete";
				return true;
        	});
        }).catch((error)=>{
			return error;
		})
	},
	  
    updateMovieById(id,obj){
		return Movie().then((movieCollection) => {
            return movieCollection.update({ _id: id },{$set:obj}).then(function() {
				//console.log(typeof this.getRecipeById(id));
            	return id;
        	});
        }).then(id=>{
			return this.getMovieById(id);
		}).catch((error)=>{
			return error;
		})
	},


    //operations related to review

    addReviewToMovieGeneral(id,obj) {   //add review to the allreviews array by providing movie id and the review object.Note: the review id should be added in the obj first
        return Movie().then((movieCollection) => {
            return movieCollection.update({ _id: id },{$addToSet:{ "allReviews": obj } }).then(function() {
                return id;
            }).then(id=>{
                return this.getMovieById(id);
            }).catch((error)=>{
                return {error:error};
            });
        });
    },

    addReviewToMovie(id,poster,rating,date,comment) {   //add review to the allreviews array by providing movie id and the review object.Note: the review id should be added in the obj first
        var reviewId=uuid.v4();
        var obj={
            _id:reviewId,
            poster:poster,
            rating:rating,
            date:date,
            comment:comment
        }
        return Movie().then((movieCollection) => {
            return movieCollection.update({ _id: id },{$addToSet:{ "allReviews": obj } }).then(function() {
                return id;
            }).then(id=>{
                return this.getMovieById(id);
            }).catch((error)=>{
                return {error:error};
            });
        });
    },


    getReviewByReviewId(mid,rid){     //get the review from the Movie by providing the specified movie id and the review id
        return Movie().then((movieCollection)=>{
            return movieCollection.findOne({_id:mid}).then((movieObj)=>{
                if(!movieObj) throw "Movie with id "+mid+" doesn't exist!";
                var reviewlist=movieObj.allReviews;
                for(var i=0;i<reviewlist.length;i++){
                    if(reviewlist[i]._id==rid) return reviewlist[i];
                }
                return "not find";
            }).catch((error)=>{
                return {error:error};
            });
        }).catch((error)=>{
                return {error:error};
        });

    },

    removeReviewByReviewId(mId,rId){   //delete specified review in the allReviews array by providing movie id and the review id
        return Movie().then((movieCollection)=>{
            return movieCollection.update({ _id: mId }, { $pull: { "allReviews": { _id: rId } } }).then(function() {
                return mId;
            }).then(id=>{
                return this.getMovieById(id);
            });
        }).catch((error)=>{
                return {error:error};
        });
    },

    updateReviewByReviewId(mid,rid,obj){   //delete specified review in the allReviews array by providing movie id and the review id
        return Movie().then((movieCollection)=>{
            return movieCollection.update({ _id: mid,allReviews:{$elemMatch: {_id:rid }}}, { $set: { "allReviews.$": obj } }).then(function() {
                return mid;
            }).then((pid)=>{
                return this.getReviewByReviewId(mid,rid).then((reviewObj)=>{
                    return reviewObj;
                });
            }).catch((error)=>{
                return {error:error};
            });
        }).catch((error)=>{
                return {error:error};
        });
    },

    //other operations

    updateAverageRating(mid,rating){
        return Movie().then((movieCollection)=>{
            return movieCollection.update({ _id:mid}, { $set: { "averageRating": rating} }).then(function() {
                return mid;
            }).then((mid)=>{
                return this.getMovieById(mid).then((reviewObj)=>{
                    return reviewObj;
                });
            }).catch((error)=>{
                return {error:error};
            });
        }).catch((error)=>{
                return {error:error};
        });
    },

    addNewKeywords(id,keyword){
        return Movie().then((movieCollection) => {
            return movieCollection.update({ _id: id },{$addToSet:{ "keywords":keyword} }).then(function() {
                return id;
            }).then(id=>{
                return this.getMovieById(id);
            }).catch((error)=>{
                return {error:error};
            });
        });
    }

}

module.exports = exportedMethods;
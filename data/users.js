mongoCollections = require("../config/mongoCollections");
Users = mongoCollections.users;
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
            return userCollection.findOne({ _id: id }).then((userObj) => {
                if (!userObj) throw "Users not found";
                return userObj;
            }).catch((error) => {
                return error;
            });
        });
    },

    getUserBySessionId(id) {
        return Users().then((userCollection) => {
            return userCollection.findOne({ sessionId: id }).then((userObj) => {
                if (!userObj) throw "Users not found";
                return userObj;
            }).catch((error) => {
                return error;
            });
        });
    },

    addUsers(obj) {
        return Users().then((userCollection) => {
            obj["_id"] = uuid.v4();
            obj["profile"]["_id"] = obj["_id"];
            return userCollection.insertOne(obj).then((userObj) => {
                return userObj.insertedId;
            }).then(newId => {
                return this.getUserById(newId);
            });
        });
    },

    deleteUserById(id) {
        return Users().then((userCollection) => {
            return userCollection.deleteOne({ _id: id }).then(function (deletionInfo) {
                if (deletionInfo.deletedCount === 0) throw "Could not find the document with this id to delete";
                return true;
            });
        }).catch((error) => {
            return error;
        })
    },

    updateUserById(id, obj) {
        return Users().then((userCollection) => {
            return userCollection.update({ _id: id }, { $set: obj }).then(function () {
                //console.log(typeof this.getRecipeById(id));
                return id;
            });
        }).then(id => {
            return this.getUserById(id);
        }).catch((error) => {
            return error;
        })
    },

    addUser(username, pwd, name, email) {
        return Users().then((userCollection) => {
            console.log("Adding user");
            let userId = uuid.v4();
            let obj = {
                _id: userId,
                hashedPassword: pwd,
                profile: {
                    _id: userId,
                    username: username,
                    name: name,
                    email: email
                }
            };
            console.log(obj);
            return userCollection.insertOne(obj).then((userObj) => {
                return userObj.insertedId;
            }).then(newId => {
                return this.getUserById(newId);
            }).catch((error) => {
                console.log("error");
                return error;
            });
        });
    },

    verifyUser(obj) {
        return Users().then((userCollection) => {
            return userCollection.findOne({ $and: [{ "profile.username": obj.username }, { hashedPassword: obj.password }] }).then((userObj) => {
                if (!userObj) throw "Users not found";

                userObj.sessionId = uuid.v4();
                return this.updateUserById(userObj._id, userObj);;
            }).catch((error) => {
                return error;
            });
        });
    }

}

module.exports = exportedMethods;
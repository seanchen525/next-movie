let ids = [];
const api = require("./api");
var directorId;

let exportedMethods = {

    formatReleaseDate(movielist) {
        for (var i = 0; i < movielist.length; i++) {
            if (!movielist[i].release_date == '') {
                let parsedDate = Date.parse(movielist[i].release_date);
                let newDate = new Date(parsedDate);
                movielist[i].release_date = newDate.toDateString();
            }
        }
        return movielist;
    },

    filterForDirector(directorId, movies, total) {

    },

    getDirectorId(director) {
        api.getPersonIdByName(director, function (result) {
            let id = result.results[0].id;
            console.log(id);
            return id;
        });
        // console.log(getName);
        //   getName.then((directorId) => {
        //     let id = directorId.results[0].id;
        //     /// callback(id);
        //     exportedMethods.storeDId(id);
        //     //directorId = id;
        // });
    },
    storeDId(id) {
        console.log("setting id to " + id);
        directorId = id;
    },
    getDId() {
        console.log("inside get id");
        console.log(directorId);
        return directorId;
    },
    getKeywordIds(keywords) {
        let ids = [];
        for (var i = 0; i < keywords.length; i++) {
            let wordId = this.getKeywordIdByName(keywords[i]);
            wordId.then((keywordId) => {
                if (keywordId.total_results > 0) {
                    ids.push(keywordId.results[0].id);
                }
            });
        }
        return ids;
    },
    getActorIds(actors) {

        let ids = [];
        for (var i = 0; i < actors.length; i++) {
            let id = this.addId(actors[i], i, actors);
            id.then((newId) => {
                console.log(newId);
                ids.push(newId);
            });
        }

        // ids.push(id);
        console.log(ids);
        return ids;
    },

    addId(current, index, array) {
        return exportedMethods.getPersonIdByName(array[index]).then((personId) => {
            console.log(personId);
            if (personId.total_results > 0) {
                return personId.results[0].id;
            }
            else {
                return;
            }
        });
    }
};

module.exports = exportedMethods; //export methods
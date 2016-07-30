(function ($, location) {

    var mainElement = $("main");
    var clearPlaylist = $(".clear");
    var removeMovie = $(".delete");
    var addReview = $(".review");
    var checkOffMovie = $(".check-off");
    var viewedMovies = $(".check");

    addReview.click(function () {

    });

    checkOffMovie.click(function () {
        let movieId = this.id;

        var flagMovie = {
            method: "PUT",
            url: '/playlist/movie/' + movieId,
        };

        $.ajax(flagMovie).then(function (response) {
            if (response.success == true) {
                window.location.reload(true);
            }
        });
    });

    clearPlaylist.click(function () {
        let playlistId = this.id;
        let verify = confirm("Are you sure you want to remove all movies from your playlist?")
        if (verify) { //clicked Ok
            var clearList = {
                method: "DELETE",
                url: '/playlist/' + playlistId,
            };

            $.ajax(clearList).then(function (response) {
                if (response.success == true) {
                    window.location.reload(true);
                }
            });
        }
    });

    removeMovie.click(function () {
        let movieId = this.id;

        var removeMovie = {
            method: "DELETE",
            url: '/playlist/movie/' + movieId,
        };

        $.ajax(removeMovie).then(function (response) {
            if (response.success == true) {
                window.location.reload(true);
            }
        });
    });


})(jQuery, window.location);
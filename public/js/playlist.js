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
        console.log("movie checkd off!");
        let movieId = this.id;
        $.ajax({
            url: '/playlist/movie/' + movieId,
            type: 'PUT',
            success: function (response) {
                window.location.reload(true);
            }
        });
        //update movie status to watched, reload page

    });

    clearPlaylist.click(function () {
        let playlistId = this.id;
        let verify = confirm("Are you sure you want to remove all movies from your playlist?")
        if (verify) { //clicked Ok
            $.ajax({
                url: '/playlist/' + playlistId,
                type: 'PUT',
                success: function (response) {
                    window.location.reload(true);
                }
            });
        }
    });

    //close button to close out of more details and read reviews

    removeMovie.click(function () {
        let movieId = this.id;
        $.ajax({
            url: '/playlist/movie/' + movieId,
            type: 'DELETE',
            success: function (response) {
                window.location.reload(true);
            }
        });

    });

})(jQuery, window.location);
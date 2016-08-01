(function ($, location) {

    var mainElement = $("main");
    var clearPlaylist = $(".clear");
    var removeMovie = $(".delete");
    var addReview = $(".review");
    var checkOffMovie = $(".check-off");
    var viewedMovies = $(".check");

    var myNewTaskForm = $(".new-item-form");

    myNewTaskForm.hide();

    myNewTaskForm.submit(function (event) {
        event.preventDefault();
        let movieId = this.id;
        let rating = $("#" + movieId + ".new-rating").val();
        let review = $("#" + movieId + ".new-review").val();

        if (rating && review) {
            var date = new Date();
            console.log(date);
            //   var month = date.getMonth() + 1;
            //  var formatDate = month + "/" + date.getDay() + "/" + date.getYear();
            var requestConfig = {
                method: "POST",
                url: "/playlist/reviews/" + movieId,
                contentType: 'application/json',
                data: JSON.stringify({
                    rating: rating,
                    review: review,
                    date: date
                })
            };

            $.ajax(requestConfig).then(function (response) {
                if (response.success == true) {
                    console.log(response.result);
                  //  var removeReview = $(".remove-review");
                   // removeReview.show();
                    window.location.reload(true);
                }
            });
        }

    });

    addReview.click(function () {
        //display review text box, change add review text to 'post', save to db and update page
        let movieId = this.id;
        let form = $("#" + movieId + ".new-item-form");
        form.toggle();
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
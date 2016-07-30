(function ($) {

    var mainElement = $("main");
    var addToPlaylist = $(".add");
    var readReviews = $(".reviews");
    var moreDetails = $(".details");
    //var reviewElement = $("review");

    addToPlaylist.click(function () {
        var movieId = this.id;
        $.post('/playlist/' + movieId, function (data) {
            // console.log(data);
        });
        alert("Movie has been added to your playlist")

    });

    readReviews.click(function () {
        var movieId = this.id;
        console.log(movieId);
        let allReviews = [];
        $.get('/playlist/reviews/' + movieId, function (data) {
            let reviews = data;
            if (reviews.length > 0) {
                for (var i = 0; i < reviews.length; i++) {
                    let output = {
                        name: reviews[i].author,
                        comment: reviews[i].content
                    }
                    allReviews.push(output);
                }
            }
            console.log(allReviews);
        });

    });


    moreDetails.click(function () {
        var movieId = this.id;
        // let details;
        $.get('/playlist/details/' + movieId, function (data) {
            let details = data;
        });
    });

})(jQuery);
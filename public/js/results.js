(function ($) {

    var mainElement = $("main");
    var addToPlaylist = $(".add");
    var readReviews = $(".reviews");
    var moreDetails = $(".details");
    var userId = $(".results").attr('id');

    addToPlaylist.click(function () {
        var movieId = this.id;

        var addMovie = {
            method: "POST",
            url: '/playlist/' + userId + '/' + movieId,
        };

        $.ajax(addMovie).then(function (response) {
            if (response.success == true) {
                alert("Movie has been added to your playlist")
            }
            else if (response.error) {
                alert(response.error);
            }
        });
    });

    // readReviews.click(function () {
    //     var movieId = this.id;
    //     let allReviews = [];
    //     $.get('/playlist/reviews/' + movieId, function (data) {
    //         let reviews = data;
    //         if (reviews.length > 0) {
    //             for (var i = 0; i < reviews.length; i++) {
    //                 let output = {
    //                     name: reviews[i].author,
    //                     comment: reviews[i].content
    //                 }
    //                 allReviews.push(output);
    //             }
    //         }
    //         console.log(allReviews);
    //     });

    // });


    moreDetails.click(function () {
        var movieId = this.id;
        // // let details;
        // $.get('/playlist/details/' + movieId, function (data) {
        //     let details = data;
        // });
    });

})(jQuery);
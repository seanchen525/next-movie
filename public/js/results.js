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
        //need to get movie that was selected
        //insert into movie and playlist collections
        //if success -alert, if not state that movie couldn't be added

    });

    readReviews.click(function () {
        var movieId = this.id;
        console.log(movieId);
        let allReviews = [];
        $.get('/reviews/' + movieId, function (data) {
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

        //console.log(allReviews);
        //reviewElement.show();
        // var newDiv = $('<div class="right"></div>');
        // for (var i = 0; i < allReviews.length; i++) {
        //     var textArea =

        //         // Now we can add it to the new form
        //         newDiv.append(textArea);

        // }

    });

    //close button to close out of more details and read reviews

    moreDetails.click(function () {
        var movieId = this.id;
        // let details;
        $.get('/details/' + movieId, function (data) {
            let details = data;
        });
    });

})(jQuery);
(function ($, localStorage, location) {
    var kvpForm = $("#server-form");
    var formAlert = $("#form-alert");
    var yearInput = $("#releaseYear");

    //clear search criteria inputs
    $("#clear-form").click(function () {
        //clear all input values
        $("#actors").val('');
        $("#genre").val('');
        $("#director").val('');
        $("#rating").val('');
        $("#releaseYear").val('');
        $("#keywords").val('');
        $("#title").val('');

    });


    // kvpForm.submit(function (event) {
    //     console.log("in submit");
    //     event.preventDefault();

    //     // reset the form
    //     formAlert.addClass('hidden');
    //     formAlert.text('');

    //     var year = parseInt(yearInput.val());

    //     if (year.length !== 4) {
    //         formAlert.text('Release year must be 4 numbers long');
    //         formAlert.removeClass('hidden');
    //         return;
    //     }

    //     return;
    // });
})(jQuery, window.localStorage, window.location);
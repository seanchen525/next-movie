Array.prototype.remove = function(val) { 
    var index = this.indexOf(val); 
    if (index > -1) { 
        this.splice(index, 1); 
    } 
};

var genre = ["Action", "Adventure", "Animation", "Comedy", "Crime", "Documentary", "Drama", "Family", "Foreign", "History", "Horror", "Music",
            "Mystery", "Romance", "Science Fiction", "TV Movie", "Thriller", "War", "Western"];
var age_rating = ["NR", "G", "PG", "PG-13", "R", "NC-17"];

(function ($) {
    var genre_val = [];
    $("#Genre li a").each(function(){
        genre_val.push($(this).attr("value"));
    });
    filterAttr(genre, genre_val);
    var genre_rest_dom = "<ul class='nav nav-pills' role='tablist' id='genre_rest_table'>";
    for (var i = 0; i < genre.length; i++){
        genre_rest_dom += "<li role='presentation'><a value=" + genre[i] + ">" + genre[i] + "<span class='glyphicon glyphicon-plus' aria-hidden='true'></span></a></li>"
    }
    genre_rest_dom += "</ul>";
    $("#Genre").append(genre_rest_dom);
    
    var age_rating_val = [];
    $("#ageRating li a").each(function(){
        age_rating_val.push($(this).attr("value"));
    });
    filterAttr(age_rating, age_rating_val);
    var age_rating_rest_dom = "<ul class='nav nav-pills' role='tablist' id='age_rating_rest_table'>";
    for (var i = 0; i < age_rating.length; i++){
        age_rating_rest_dom += "<li role='presentation'><a value=" + age_rating[i] + ">" + age_rating[i] + "<span class='glyphicon glyphicon-plus' aria-hidden='true'></span></a></li>"
    }
    age_rating_rest_dom += "</ul>";
    $("#ageRating").append(age_rating_rest_dom);
    
    $("#preferences button.close").each(function(){
        var that = this;
        $(that).bind("click", function(){
            var delete_val = $(this).parent().attr("value");
            var attr_key = $(this).parent().parent().parent().parent().attr("id");
            
        });
    });
    
    $("#preferences button.search_attr").each(function(){
        var that = this;
        $(that).bind("click", function(){
            var search_val = $(this).parent().prev().val();
            var attr_key = $(this).parent().parent().parent().parent().attr("id");
            
        });
    });
    
    $("#preferences .glyphicon-plus").each(function(){
        var that = this;
        $(that).bind("click", function(){
            var delete_val = $(this).parent().attr("value");
            var attr_key = $(this).parent().parent().parent().parent().attr("id");
            
        });
    });
    
    $("#email_btn").bind("click", function(){
        $("#email-error-container")[0].classList.add("hidden");
        
        if ($("#email").val() == $("#email").attr("value")){
            alert("There is no change about email!");
            return;
        }
        
        var requestConfig = {
            method: "POST",
            url: "/user/update_email",
            contentType: 'application/json',
            data: JSON.stringify({
                email: $("#email").val()
            })
        };
        
        $.ajax(requestConfig).then(function (responseMessage) {
            if (responseMessage.success){
                $("#email").attr("value", responseMessage.email);
                $("#email-result-container")[0].getElementsByClassName("text-goes-here")[0].textContent = "Update success!";
                $("#email-result-container")[0].classList.remove("hidden");    
            } else {
                $("email-error-container")[0].getElementsByClassName("text-goes-here")[0].textContent = "Update failure!";
                $("email-error-container")[0].classList.remove("hidden");   
            }
        });
    });
    
})(window.jQuery);

function filterAttr(dataSet, valStr){ 
    for (var i= 0 ; i < valStr.length; i++){
        dataSet.remove(valStr[i]);
    }
}


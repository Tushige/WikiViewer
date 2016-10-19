/* Further Work:
   1. add animation
 */
$(document).ready(function() {
    var random = document.getElementById("random_title");
    var search = document.getElementById("searchBtn");
    var base = "https://en.wikipedia.org/w/api.php";

    /*links to a random wiki article*/
    random.onclick = function(e) {
        window.location.href="http://en.wikipedia.org/wiki/Special:Random";
    };

    /*user searching*/
   search.onkeyup = function(e) {
       if(e.keyCode != 13)
           return;
       var url = base + '?action=query&format=json&indexpageids=&generator=search&gsrsearch='
       url+=search.value+'&gsrnamespace=0&gsrlimit=10';
       /*use jsonp to make cross-domain request*/
       $.getJSON(url+'/&callback=?', function(data) {
        var html="";
        //array of pageids
        var pages = data.query.pageids;
        pages.forEach(function(key) {
            html+= "<section class='search-item'><a href='"+'https://en.wikipedia.org/?curid=';
            html+=data.query.pages[key].pageid+ "'>";
            html+=data.query.pages[key].title+"</a></section>";
        });
        $("#result").html(html);
       });
    };

//END
});

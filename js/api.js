(function($){

//fetch a random quote post http://localhost:8888/project5/wp-json/wp/v2/posts

//load all the posts and count them and then do a random number from 1 to whatver

//history api mdn HISTORYpushstate

//submit a new quote with the form using jquery 

$( '#new-quote-button' ).on( 'click', function ( s ) {
    s.preventDefault();
    $.ajax({
      url: '/project5/wp-json/wp/v2/posts?filter[orderby]=rand&filter[posts_per_page]=1',
          success: function ( data ) {

            $(".entry-title").empty();
            $(".entry-title").append(data[0].title.rendered);
            $(".entry-content").empty();
            $(".entry-content").append(data[0].content.rendered);
            $(".source").empty();
            $(".source").append('<a href="' + data[0]._qod_quote_source_url + '">' + data[0]._qod_quote_source + '</a>');

    }});

  } );

})(jQuery);
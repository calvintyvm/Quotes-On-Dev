(function($){

//fetch a random quote post http://localhost:8888/project5/wp-json/wp/v2/posts

//load all the posts and count them and then do a random number from 1 to whatver

//history api mdn HISTORYpushstate

//submit a new quote with the form using jquery 

var lastPage = '';

$( '#new-quote-button' ).on( 'click', function ( s ) {
  
    s.preventDefault();
    lastPage = document.URL;
    $.ajax({
      url: '/project5/wp-json/wp/v2/posts?filter[orderby]=rand&filter[posts_per_page]=1',
          success: function ( data ) {


            var quoteUrl = data[0]._qod_quote_source_url;
            var quoteSource = data[0]._qod_quote_source;
            var titleRendered = data[0].title.rendered;
            var titleSlug = data[0].slug;
            var contentRendered = data[0].content.rendered;

            if(quoteUrl.length > 0){
            $(".entry-content").empty();
            $(".entry-content").append(contentRendered);
            $(".entry-title").empty();
            $(".entry-title").append("&mdash;" + titleRendered + ",");
            $(".source").empty();
            $(".source").append(' ' + '<a href="' + quoteUrl + '">' + quoteSource + '</a>');
            history.pushState(null,null,titleSlug);

            } else if(quoteSource.length > 0 ){
            $(".entry-content").empty();
            $(".entry-content").append(contentRendered);
            $(".entry-title").empty();
            $(".entry-title").append("&mdash;" + titleRendered + ",");
            $(".source").empty();
            $(".source").append(' ' + quoteSource);
            history.pushState(null,null,titleSlug);

            }else{
            $(".entry-content").empty();
            $(".entry-content").append(contentRendered);
            $(".entry-title").empty();
            $(".entry-title").append("&mdash;" + titleRendered);
            $(".source").empty();
            $(".source").append(quoteSource);
            history.pushState(null,null,titleSlug);
              //history popstate
            
            }
    }});

  } );

  $(window).on('popstate', function() {
    console.log("popstate fired!");
    if (window.location.hash.indexOf('qm-overview') === 1) {
      return false;
    }else {
      window.location.replace(lastPage);
    }
  });


  // $('#submit-quote').on('click', function(e){
  //   e.preventDefault();

    
  //   // get the value of the fields to send

  //   // ajax post request

  //   // data to send will have the title, content, _qod_source, _qod_source_url
 


  // });

  // $( "form" ).submit(function( event ) {
  //   event.preventDefault();
  //   $(":input").each(function() {
  //     if($(this).val() === "")
  //      alert("Empty Fields!!");
  //      else{
         
  //      }
  //  });
  // });
  
  // submit a new quote from the form, e.g. button .on click form .submit
  // post request wp-json/wp/v2/posts
  // before send nonce authentication, it's in the slides from wp ajax lesson


 

  






  $('#submit-quote').on('click', function(e){
    e.preventDefault();
    var data = {
      title:$('#quote-author').val(),
      content:$('textarea#quote-content').val(),
      _qod_quote_source:$('#quote-source').val(),
      _qod_quote_source_url:$('#quote-source').val(),
    }

 $.ajax({
      method: 'post',
      url: api_vars.root_url + "wp/v2/posts/",
      data:data,
      beforeSend: function (xhr) {
          xhr.setRequestHeader('X-WP-Nonce', api_vars.nonce);
      }
  }).done( function() {
    $('#quote-submission-form').hide('slow');
    $('.entry-title').after('<p>' + api_vars_success+ '</p>');

  })
  .fail(function(){
    $('#quote-submission-form').hide('slow');
    $('.entry-title').after('<p>' + api_vars.failure + '</p>');
  })

});







})(jQuery);
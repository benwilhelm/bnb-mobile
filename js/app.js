var portfolioData ;

$('[data-role="page"]').live('pagebeforecreate',function(e){
  var headerHtml = $('#header_html').html() ;
  $(this).find('[data-role="header"]').html(headerHtml) ;
  var footerHtml = $('#footer_html').html() ;
  $(this).find('[data-role="footer"]').html(footerHtml) ;
}) ;

$('[data-role="page"]').live('pageinit',function(e){
  //$(".photoswipe a").click(function(e){
  //  e.preventDefault() ;
  //  e.stopPropagation() ;
  //}).photoSwipe() ;
  $(".quit").click(function(e){
    e.preventDefault() ;
    e.stopPropagation() ;
    navigator.app.exitApp() ;
  }) ;

});

$('#home').live('pageinit',function(e) {
  var $page = $(this) ;  
  $page.trigger('create') ;
  
  $('#login_form').submit(function(e){
    e.preventDefault() ;
    e.stopPropagation() ;
    var data = $(this).serialize() ;
    var the_url = $(this).attr('action') ;
    portData = '{"categories":[{"term_id":1,"name":"Category 1"},{"term_id":2,"name":"Category 2"}]}' ;
    //$.post(the_url,data,function(portData){
      portfolioData = $.parseJSON(portData) ;
      console.log(portfolioData) ;
      $.mobile.changePage("#portfolio_sync",{transition:'slideup'}) ;
      var $content = $("#portfolio_sync .content") ;
      $.each(portfolioData.categories,function(idx,obj){
        $content.append("<p>Importing Category: " + obj.name + "</p>") ;
        db.insert_row('categories',obj) ;
      }) ;
      
      $content.append("<hr>") ;
      for (var i in localStorage) {
        var category = $.parseJSON(localStorage[i])
        $content.append("<p>Stored Category " + i + ": " + category.name + "</p>") ;
        $content.append("<pre>" + localStorage[i] + "</pre>") ;
      }
    //}) ;
  }) ;
}) ;


$('#home').live('pagebeforeshow',function(e){

}) ;



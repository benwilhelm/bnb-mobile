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
    //portData = '{"categories":[{"term_id":1,"name":"Category 1"},{"term_id":3,"name":"Category 3"}]}' ;
    $.post(the_url,data,function(portData){
      portfolioData = $.parseJSON(portData) ;
      $.mobile.changePage("#portfolio_sync") ;
      var $content = $("#portfolio_sync .content") ;
      $content.html('<p>Syncing...</p>') ;
      
      if (typeof portfolioData.categories != 'undefined')
        db.sync('categories',portfolioData.categories) ;      

      if (typeof portfolioData.category_map != 'undefined')
        db.sync('category_map',portfolioData.category_map) ;

      if (typeof portfolioData.portfolios != 'undefined')
        db.sync('portfolios',portfolioData.portfolios) ;

      if (typeof portfolioData.images != 'undefined')
        db.sync('images',portfolioData.images) ;      

      $content.append("<hr>") ;
      var tables = ['categories','category_map','portfolios','images'] ;
      for (var t=0; t<tables.length; t++) {
        var table = tables[t] ;
        $content.append("<h3>" + table + "</h3>") ;
        var pnames = {'categories':'name','category_map':'map_id','portfolios':'post_title','images':'post_title'} ;
        $.each(db.select_all(table),function(idx,obj){
          var title = obj[pnames[table]] ;
          $content.append("<p>" + title + "</p>") ;
        }) ;
      }
    }) ;
  }) ;
}) ;


$('#home').live('pagebeforeshow',function(e){

}) ;



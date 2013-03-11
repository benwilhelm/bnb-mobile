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
    portData = '{' ;
    portData += '"categories":[{"term_id":1,"name":"Category 1"},{"term_id":3,"name":"Category 3"}]' ;
    portData += ',"category_map":[{"term_id":"46","object_id":"18","map_id":"46-18"},{"term_id":"46","object_id":"31","map_id":"46-31"},{"term_id":"46","object_id":"65","map_id":"46-65"},{"term_id":"46","object_id":"157","map_id":"46-157"}]' ;
    portData += ',"portfolios":[{"ID":719,"post_author":"1","post_date":"2013-02-12 23:37:33","post_date_gmt":"2013-02-12 23:37:33","post_title":"The Ice Storm","post_excerpt":"","post_status":"publish","comment_status":"closed","ping_status":"closed","post_password":"","post_name":"the-ice-storm","to_ping":"","pinged":"","post_modified":"2013-03-10 04:38:16","post_modified_gmt":"2013-03-10 04:38:16","post_content_filtered":"","post_parent":0,"guid":"http:\/\/benwilhelm.com\/?post_type=portfolio&#038;p=719","menu_order":3,"post_type":"portfolio","post_mime_type":"","comment_count":"0","filter":"raw"},{"ID":597,"post_author":"1","post_date":"2013-01-20 18:47:58","post_date_gmt":"2013-01-20 18:47:58","post_title":"Morning Frost","post_excerpt":"","post_status":"publish","comment_status":"closed","ping_status":"closed","post_password":"","post_name":"morning-frost","to_ping":"","pinged":"","post_modified":"2013-03-10 04:38:16","post_modified_gmt":"2013-03-10 04:38:16","post_content_filtered":"","post_parent":0,"menu_order":4,"post_type":"portfolio","post_mime_type":"","comment_count":"0","filter":"raw"},{"ID":527,"post_author":"1","post_date":"2012-12-01 00:09:41","post_date_gmt":"2012-12-01 00:09:41","post_content":"","post_title":"Honeymoon","post_excerpt":"","post_status":"publish","comment_status":"closed","ping_status":"closed","post_password":"","post_name":"honeymoon","to_ping":"","pinged":"","post_modified":"2013-03-10 04:38:16","post_modified_gmt":"2013-03-10 04:38:16","post_content_filtered":"","post_parent":0,"menu_order":5,"post_type":"portfolio","post_mime_type":"","comment_count":"0","filter":"raw"}]' ;
    portData += ',"images":[{"ID":764,"post_author":"2","post_date":"2013-03-10 23:23:14","post_date_gmt":"2013-03-10 23:23:14","post_content":"","post_title":"_DSC1693","post_excerpt":"","post_status":"inherit","comment_status":"open","ping_status":"open","post_password":"","post_name":"_dsc1693","to_ping":"","pinged":"","post_modified":"2013-03-10 23:23:14","post_modified_gmt":"2013-03-10 23:23:14","post_content_filtered":"","post_parent":157,"guid":"http:\/\/nagel.staging.bitsandbristles.com\/wp-content\/uploads\/sites\/2\/2012\/03\/DSC1693.jpg","menu_order":0,"post_type":"attachment","post_mime_type":"image\/jpeg","comment_count":"0","filter":"raw","src":{"thumb":["http:\/\/staging.bitsandbristles.com\/wp-content\/uploads\/sites\/2\/2012\/03\/DSC1693.jpg",99,150,false],"original":["http:\/\/staging.bitsandbristles.com\/wp-content\/uploads\/sites\/2\/2012\/03\/DSC1693.jpg",798,1200,false]}},{"ID":763,"post_author":"2","post_date":"2013-03-10 23:23:13","post_date_gmt":"2013-03-10 23:23:13","post_content":"","post_title":"_DSC1684","post_excerpt":"","post_status":"inherit","comment_status":"open","ping_status":"open","post_password":"","post_name":"_dsc1684","to_ping":"","pinged":"","post_modified":"2013-03-10 23:23:13","post_modified_gmt":"2013-03-10 23:23:13","post_content_filtered":"","post_parent":157,"guid":"http:\/\/nagel.staging.bitsandbristles.com\/wp-content\/uploads\/sites\/2\/2012\/03\/DSC1684.jpg","menu_order":0,"post_type":"attachment","post_mime_type":"image\/jpeg","comment_count":"0","filter":"raw","src":{"thumb":["http:\/\/staging.bitsandbristles.com\/wp-content\/uploads\/sites\/2\/2012\/03\/DSC1684.jpg",99,150,false],"original":["http:\/\/staging.bitsandbristles.com\/wp-content\/uploads\/sites\/2\/2012\/03\/DSC1684.jpg",798,1200,false]}}]' ;
    portData += '}' ;
    //$.post(the_url,data,function(portData){
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

        var all = db.select_all(table) ;
        $.each(all,function(idx,obj){
          var title = obj[pnames[table]] ;
          $content.append("<p>" + title + "</p>") ;
        }) ;
      }
    //}) ;
  }) ;
}) ;


$('#home').live('pagebeforeshow',function(e){

}) ;



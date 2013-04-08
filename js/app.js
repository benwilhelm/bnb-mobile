var portfolioData, db ;
var db_initialized = false ;

document.addEventListener('deviceready',function(){
  console.log('device ready') ;
  db = get_db() ;
  make_db(db) ;
}) ;

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

$('#home').live('pageshow',function(e){
  console.log('home init') ;
  var $page = $(this) ;    
  $page.trigger('create') ;
  var $content = $("#home .content") ;
  var counter = 1 ;

  var intvl = setInterval(function(){
    console.log('iterate') ;
    counter++ ;
    if (db_initialized || counter > 20) {
      console.log('cleared') ;
      console.log(db) ;
      clearInterval(intvl) ;
      list_categories($content) ;
      $("#home .content > ul").listview('refresh') ;
    }
  }, 100) ;
}) ;

$('#sync_form').live('pageinit',function(e) {
  var $page = $(this) ;  
  
  $('#login_form').submit(function(e){
    e.preventDefault() ;
    e.stopPropagation() ;
    $.mobile.changePage("#portfolio_sync") ;
    var data = $(this).serialize() ;
    var the_url = $(this).attr('action') ;

    $.post(the_url,data,function(portData){
      portfolioData = $.parseJSON(portData) ;
      var $content = $("#portfolio_sync .content") ;
      $content.html('<p>Syncing...</p>') ;      
      sync_db(portfolioData) ;
      $content.append("<hr>") ;
      list_categories($content) ;    
    }) ;
  }) ;
}) ;


$('#home').live('pagebeforeshow',function(e){

}) ;



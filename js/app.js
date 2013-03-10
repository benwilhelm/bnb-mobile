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
    console.log('quit') ;
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
    var data = $(this).serialize() ;
    var the_url = $(this).attr('action') ;
    $.post(the_url,data,function(portData){
    //portData = '{"testing 1":"testing", "testing 2":"testing"}' ;
      portfolioData = $.parseJSON(portData) ;
      console.log(portfolioData) ;
      $.mobile.changePage("#portfolio_sync",{transition:'slideup'}) ;
      var $content = $("#portfolio_sync .content") ;
      $.each(portfolioData,function(idx,obj){
        $content.append("<p>" + obj.post_title + "<br>" + obj.imgs.length + " images</p>") ;
      }) ;
    }) ;
  }) ;
}) ;


$('#home').live('pagebeforeshow',function(e){

}) ;



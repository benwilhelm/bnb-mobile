$('[data-role="page"]').live('pagebeforecreate',function(e){
  var headerHtml = $('#header_html').html() ;
  $(this).find('[data-role="header"]').html(headerHtml) ;
  var footerHtml = $('#footer_html').html() ;
  $(this).find('[data-role="footer"]').html(footerHtml) ;
}) ;

$('[data-role="page"]').live('pageinit',function(e){
  $(".quit").click(function(e){
    console.log('quit') ;
    e.preventDefault() ;
    e.stopPropagation() ;
    navigator.app.exitApp() ;
  }) ;

});

$('#home').live('pageinit',function(e) {
  var $page = $(this) ;  
  var $homeBtn = $page.find(".home-button") ;
  $homeBtn.attr('data-icon','delete') ;
  $page.trigger('create') ;
  
  $("#download_me").click(function(e){
    e.preventDefault() ;
    e.stopPropagation() ;
    var uri = encodeURI("http://c385093.r93.cf1.rackcdn.com/2/files/2012/01/DSC039931-450x299.jpg") ;
    var destination = "/sdcard/com.doublebeamdesign.download-test/test.jpg" ;
    var fileTransfer = new FileTransfer() ;
    fileTransfer.download(uri, destination,function(f){
      // success
      mobile_alert.alert("Success!<br>" + f.fullPath ) ;
      $('.status').html("<img src='" + f.fullPath + "' />") ;
    },function(err){
      // failure
      mobile_alert.alert(
        //"download error source: " + err.source + "<br>" + 
        //"download error target: " + err.target + "<br>" + 
        "<strong>No dice</strong><br>" +
        "error code: " + err.code + "<br>" +
        "http status: " + err.http_status + "<br>" 
      ) ;
    }) ;
  }) ;
}) ;

$('#new').live('pageinit',function(e) {
  var $page = $(this) ;

}) ;



$('#home').live('pagebeforeshow',function(e){

}) ;



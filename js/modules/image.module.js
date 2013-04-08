function download_image(img) {
  var a = img.src.split('/') ;
  var b = img.tn.split('/') ;
  var src_filename = a[a.length - 1] ;
  var tn_filename = b[b.length - 1] ;
  var dir = '/sdcard/com.bitsandbristles.bnb-mobile/' ;

  var src = encodeURI(img.src) ;
  var tn = encodeURI(img.tn) ;
  var src_dest =  dir + src_filename ;
  var tn_dest = dir + tn_filename ;
  
  var fileTransfer = new FileTransfer() ;
  fileTransfer.download(src, src_dest, function(f){
    // success
    console.log('src success') ;
    //console.log(f) ;
  }, function(err){
    // failure
    console.log('src failure') ;
  }) ;
  
  fileTransfer.download(tn, tn_dest, function(f){
    // success
    console.log('tn success') ;
    //console.log(f) ;
  }, function(err){
    // failure
    console.log('tn failure') ;
  }) ;
}
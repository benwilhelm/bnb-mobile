function list_categories($elmnt) {
  console.log(db) ;
  db.transaction(function(tx){
    tx.executeSql("SELECT * FROM categories ORDER BY name",{},function(tx, results){
      console.log(results.rows) ;
      for (var i=0; i<results.rows.length; i++ ) {
        var row = results.rows.item(i) ;
        console.log('appending ' + row.name) ;
        $elmnt.append("<p>" + row.name + "</p>") ;
      }
    },errorCB) ;
  },errorCB) ;
}
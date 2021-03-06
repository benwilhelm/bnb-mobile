function get_db() {
  return window.openDatabase('bnb_database.sqlite3','1.0','B&B Database',1000000) ;
}

function make_db(db, callback) {
  db.transaction(function(tx){
//    tx.executeSql("DROP TABLE portfolios") ;
//    tx.executeSql("DROP TABLE categories") ;
//    tx.executeSql("DROP TABLE images") ;
//    tx.executeSql("DROP TABLE portfolios_categories") ;
    tx.executeSql("CREATE TABLE IF NOT EXISTS portfolios (wp_id INT unique, title TEXT, content TEXT)") ;
    tx.executeSql("CREATE TABLE IF NOT EXISTS categories (wp_id INT unique, name TEXT, parent INT)") ;
    tx.executeSql("CREATE TABLE IF NOT EXISTS images (wp_id INT unique, tn TEXT, src TEXT, caption TEXT, portfolio_id INT)") ;
    tx.executeSql("CREATE TABLE IF NOT EXISTS portfolios_categories (portfolio_id INT, category_id INT)") ;
  },errorCB, callback) ;
  
  db_initialized = true ;
}

function errorCB(err) {
  console.log("Error processing SQL") ;
  console.log(err);
}


function sync_db(portfolioData) {
  sync_categories(portfolioData.categories) ;
  sync_portfolios(portfolioData.portfolios) ;
  sync_images(portfolioData.images) ;
  sync_portfolios_categories(portfolioData.category_map) ;
}


function sync_categories(items) {
  db.transaction(function(tx){
    tx.executeSql("DELETE FROM categories") ;
    for (var i=0; i<items.length; i++) {
      var item = items[i] ;
      var sql = "INSERT INTO categories (wp_id, name, parent) VALUES (?,?,?) ;" ;
      console.log(sql) ;
      tx.executeSql(sql, [item.term_id, item.name, item.parent]) ;
    }
  },errorCB)
}

function sync_portfolios(items) {
  db.transaction(function(tx){
    tx.executeSql("DELETE FROM portfolios") ;
    for (var i=0; i<items.length; i++) {
      var item = items[i] ;
      var sql = "INSERT INTO portfolios (wp_id, title, content) VALUES (?,?,?) ;" ;
      tx.executeSql(sql, [item.ID, item.post_title, item.post_content]) ;
    }
  },errorCB)
}

function sync_images(items) {
  db.transaction(function(tx){
    tx.executeSql("DELETE FROM images") ;
    for (var i=0; i<items.length; i++) {
      var item = items[i] ;
      var sql = "INSERT INTO images (wp_id, tn, src, caption, portfolio_id) VALUES (?,?,?,?,?) ;" ;
      tx.executeSql(sql, [item.ID, item.src.thumb[0], item.src.original[0], item.post_excerpt, item.post_parent]) ;
    }
  },errorCB);
  
  db.transaction(function(tx){
    tx.executeSql("SELECT * FROM images",{},function(tx, results){
      for (var i=0; i<results.rows.length; i++ ) {
        img = results.rows.item(i) ;
        download_image(img) ;
      }
    },errorCB) ;
  },errorCB)
  
}

function sync_portfolios_categories(items) {
  db.transaction(function(tx){
    tx.executeSql("DELETE FROM portfolios_categories") ;
    for (var i=0; i<items.length; i++) {
      var item = items[i] ;
      var sql = "INSERT INTO portfolios_categories (portfolio_id, category_id) VALUES (?,?) ;" ;
      tx.executeSql(sql, [item.object_id, item.term_id]) ;
    }
  },errorCB)
}



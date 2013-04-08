function list_categories($elmnt) {
  if (typeof db == 'undefined') {
    console.log("DB Undefined!") ;
    return ;
  }
  
  var list = [] ;
  db.transaction(function(tx){
    tx.executeSql("SELECT * FROM categories ORDER BY name",{},function(tx, results){
      for (var i=0; i<results.rows.length; i++ ) {
        row = results.rows.item(i) ;
        list.push(row) ;
      }
    },errorCB) ;
  },errorCB, function(){
    var tree = build_category_tree(list,0) ;
    print_category_tree(tree, $elmnt) ;
  }) ;  
}


function build_category_tree(categories, parent_id) {
  var branch = [] ;
  
  for (var i=0; i<categories.length; i++) {
    var category = categories[i] ;
    if (category.parent == parent_id) {
      var children = build_category_tree(categories, category.wp_id) ;
      if (children.length > 0) {
        category.children = children ;
      }
      branch.push(category) ;
    }
  }
  return branch ;
}

function print_category_tree(categories, $elmnt, sub) {
  var $ul = $("<ul data-role='listview'></ul>") ;

  if (!sub) {
    var $all = $("<li><a href='#'>All</a></li>") ;
    $ul.append($all) ;
  }

  for (var i=0; i<categories.length; i++) {
    category = categories[i] ;
    var $li = $("<li><a href='#'>" + category.name + "</a></li>") ;
    if (category.children) {
      print_category_tree(category.children, $li, true) ;
    }
    $ul.append($li) ;
  }
  $elmnt.append($ul) ;
}
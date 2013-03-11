var db = {

  select_row: function(table,idx) {
    var full_idx = table + '.' + idx ;
    var str = localStorage[full_idx] ;
    var obj = $.parseJSON(str) ;
    return obj ;
  },
    
  insert_row: function(table,obj) {
    var obj_idx = obj[this.schema.id_columns[table]] ;
    var idx = table + '.' + obj_idx ;
    var str = JSON.stringify(obj) ;
    localStorage.setItem(idx,str) ;
    return obj_idx ;
  },
    
  delete_row: function(table,idx) {
    var full_idx = table + "." + idx ;
    localStorage.removeItem(full_idx) ;
  },
  
  select_all: function(table,options) {
    var ret = [] ;
    for (var idx in localStorage) {
      if (idx.substring(0,table.length + 1) == table + '.') {
        var short_idx = idx.replace(table + '.','') ;
        if (short_idx && short_idx != 'undefined') {
          ret.push(this.select_row(table,short_idx)) ;
        }
      }
    }  
    
    if (options && options.orderby) {
      ret.sort(function(a,b) {
        return a[options.orderby] > b[options.orderby] ;
      }) ;
    }
    return ret ;
  },
  
  sync: function(table,rows) {
    var row_ids = [] ;
    for (var i=0; i<rows.length; i++) {
      var row = rows[i] ;
      var row_id = this.insert_row(table,row) ;
      row_ids.push(row_id) ;
    }
    
    var all_rows = this.select_all(table) ;
    for (var j=0; j<all_rows.length; j++) {
      var test_row = all_rows[j] ;
      var test_row_id = this.get_row_id(test_row,table) ;
      if ($.inArray(test_row_id,row_ids) == -1) {
        this.delete_row(table,test_row_id) ;
      }
    }
  },
  
  get_row_id: function(row,table) {
    return row[this.schema.id_columns[table]] ;
  },
  
  schema: {
    id_columns: {
      categories: 'term_id',
      category_map: 'map_id',
      portfolios: 'ID',
      images: 'ID'
    },
    modified_columns: {
      categories: false,
      category_map: false,
      portfolio: 'post_modified_gmt',
      image: 'post_modified_gmt'
    }
  }
};
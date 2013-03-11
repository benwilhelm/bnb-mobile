var db = {

  select_row: function(table,idx) {
    var full_idx = table + '.' + idx ;
    var str = localStorage[full_idx] ;
    var obj = JSON.parse(str) ;
    return obj ;
  },
    
  insert_row: function(table,obj) {
    var obj_idx = obj[this.schema.id_columns[table]] ;
    var idx = table + '.' + obj_idx ;
    var str = JSON.stringify(obj) ;
    localStorage.setItem(idx,str) ;
    return  ;
  },
    
  delete_row: function(table,idx) {
    var full_idx = table + "." + idx ;
    localStorage.removeItem(full_idx) ;
  },
  
  select_all: function(table,options) {
    var ret = [] ;
    for (var idx in localStorage) {
      if (idx.substring(0,table.length + 1) == table + '.') {
        ret.push(this.select(idx)) ;
      }
    }  
    
    if (options && options.orderby) {
      ret.sort(function(a,b) {
        return a[options.orderby] > b[options.orderby] ;
      }) ;
    }
    return ret ;
  },
  
  schema: {
    id_columns: {
      categories: 'term_id',
      portfolio: 'ID',
      image: 'ID'
    }
  }
};
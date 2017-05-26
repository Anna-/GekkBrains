//-----------------first(169)--------
str.toLowerCase().split('')
.filter(function(c){return /\w/g.test(c);})
.map(function(c,i,arr){return c+arr[arr.length-1-i];})
.every(function(c){return c[0]==c[1]});

//-----------------second(146)---------
str.toLowerCase()
.replace(/\W/g, '').split('')
.map(function(c,i,arr) {return c+arr[arr.length-1-i];})
.every(function(c){return c[0]==c[1]});

//--------------third(102)------
str.toLowerCase()
.replace(/\W/g, '').split('')
.every(function(c,i,s){return c==s[s.length-1-i];});


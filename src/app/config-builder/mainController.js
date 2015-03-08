angular.module('config-builder').controller('mainController', function(Github) {
  debugger
  if(parse('code')){
    Github.getTokenPromise(parse('code')).then(function(){
      Github.getUserPromise().then(function (user) {
        debugger
        console.log(user);
      });
    });
  }
});


//for now without router
function parse(val) {
  var result = undefined,
    tmp = [];
  location.search
    //.replace ( "?", "" )
    // this is better, there might be a question mark inside
    .substr(1)
    .split("&")
    .forEach(function (item) {
      tmp = item.split("=");
      if (tmp[0] === val) result = decodeURIComponent(tmp[1]);
    });
  return result;
}
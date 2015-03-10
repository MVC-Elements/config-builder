angular.module('config-builder').controller('mainController', function($scope, $location, Github) {

  var code = $location.search().code;

  $scope.user = null;
  $scope.repos = [];

  if(code){
    Github.getTokenPromise(code).then(function(){
      Github.getUserPromise().then(function (user) {
        $scope.user = user.data;
      });
      Github.getUserRepos().then(function (repos) {
        $scope.repos = repos.data;
      });
    });
  }
  
  $scope.$applyAsync(function() {
    console.log($routeParams);
  })
  
});
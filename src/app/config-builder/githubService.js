angular.module('config-builder')
  .service('Github', function($http) {

    var token = null;

    this.getTokenPromise = function(code) {
      return $http.get('/api/github/gettoken/' + code).then(function(result){
        token = result.data.access_token;
      });
    };

    this.getUserPromise = function() {
      return $http.get('https://api.github.com/user?access_token=' + token);
    }

    this.getUserRepos = function() {
      return $http.get('https://api.github.com/user/repos?access_token=' + token)
    }
  });
angular.module('config-builder')
  .service('Github', function(Restangular){
    this.getToken = function(code) {
      ///api/github/gettoken/:code
    }
  });
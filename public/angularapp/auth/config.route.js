(function() {
  'use strict';
  
  angular
    .module('app.auth')
    .config(configFunction);

  //configFunction.$inject = ['$routeProvider']; //from angulr-route.js  // this line not necessary

  function configFunction($routeProvider) {
    $routeProvider
    .when('/register', {
      templateUrl: '/angularapp/auth/register.html',
      controller: 'AuthController',
      controllerAs: 'vm'
    })
    .when('/login', {
      templateUrl: '/angularapp/auth/login.html',
      controller: 'AuthController',
      controllerAs: 'vm'
    });
  }
})();
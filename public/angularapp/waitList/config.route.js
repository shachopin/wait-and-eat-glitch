(function() {
  'use strict';
  
  angular
    .module('app.waitList')
    .config(configFunction);

  //configFunction.$inject = ['$routeProvider']; //from angulr-route.js  // this line not necessary

  function configFunction($routeProvider) {
    $routeProvider.when('/waitList', {
      templateUrl: '/angularapp/waitList/waitList.html',
      controller: 'WaitListController',
      controllerAs: 'vm',
      resolve: {user: resolveUser}  //here the "user" can be used as a depdency for controller
    });
  }
  
  function resolveUser(authService) {
    return authService.firebaseAuthObject.$requireSignIn(); //buit-in function by firebase that if the user is logged in, returns a promise that ruturns the user object, the promise will got rejected, if user is not logged-in
    //return a promise, if the promise can be resolved successully, then go to waitList controller, and user set to the return value of the resolve value
    //the user can be injected into WaitList controller
    //if not, the WaitListController won't even be loaded (#/waitList page can still show, it's just the waitList controller do nothing)
    //if the promise got rejected, will trigger the $routeChangeError event on $rootScope (we want to capture that event and force user go to login page)
    //we will do that in app.module.js
  }
})();
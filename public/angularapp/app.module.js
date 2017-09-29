(function() {
  'use strict';

  angular
    .module('app', [
      // Angular modules.
      'ngRoute',

      // Third party modules.
      'firebase',

      //Cutom module
      'app.auth',
      'app.core',
      'app.landing',
      'app.layout',
      'app.waitList'
    ])
    .config(configFunction)
    .run(runFunction); //run is for running any code
  
  
  function configFunction($routeProvider) {
    $routeProvider.otherwise({
      redirectTo: '/'
    });
  }
  //$rootScope, $location are from angular default lib, no 3rd party lib
  function runFunction($rootScope, $location) { //even this runFunction can have dependencies
    $rootScope.$on('$routeChangeError', function(event, next, previous, error) {
      if (error === "AUTH_REQUIRED") {
        $location.path("/");
      }
      
    });
  }
  
  /* remember in waitList/config.route.js,  you have the following,  //if the promise got rejected (use is not logged-in), will trigger the $routeChangeError event on $rootScope
  $rootScope is event emitter
  
  function resolveUser(authService) { //even this resolve function can have dependency
    return authService.firebaseAuthObject.$requireSignIn();
    //return a promise, if the promise can be resolved successully, then go to waitList controller, and user set to the return value of the resolve value
    //the user can be injected into WaitList controller
    //if not, the WaitListController won't even be loaded
    //if the promise got rejected (when user is not logged-in), will trigger the $routeChangeError event on $rootScope
  }
  */
  
  // check more here: https://www.firebase.com/docs/web/libraries/angular/guide/user-auth.html
  // check Authenticating With Routers sectioon  
 })();
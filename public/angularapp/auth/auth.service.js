(function() {
  'use strict';
  
  angular
    .module('app.auth')
    .factory('authService', authService); 
  
  function authService($firebaseAuth, firebaseDataService, partyService) {
    //return an object
    var firebaseAuthObject = $firebaseAuth();
    //put this above line in a service, so only run once during the whole app among routes
    //if I put in controller, will run multiple times every time the controller is needed
    //however, this one in service is still run each time if I refresh the whole page
    //then how come after logged-in, $firebaseAuth.$getAuth() will return not null?
    //even if I refresh the whole page??
    
    //Because of the localStrorage, I have this -  firebase:authUser:AIzaSyDBkGghzQGbPfjbbJhw0C0oJ8ASkV6qDNI:[DEFAULT]
    //after successful sign-in
    //this token will be erased after I do log out
    //firebase email signin - it's using token-based authentication
  
    var service = {
      firebaseAuthObject: firebaseAuthObject,
      register: register,
      login:login,
      logout:logout,
      isLoggedIn: isLoggedIn,
      sendWelcomeEmail: sendWelcomeEmail
    };
    
    return service;
    
    /////////////
    
    function register(user) {
      return firebaseAuthObject.$createUserWithEmailAndPassword(user.email, user.password); //return a promise
    }
    
    function login(user) {
      return firebaseAuthObject.$signInWithEmailAndPassword(user.email, user.password);  //return a promise
    }
    
    function logout() {
      partyService.reset(); //to fix the permission error after enforced by adding security rules
      firebaseAuthObject.$signOut();
    }
    
    function isLoggedIn() {
      return firebaseAuthObject.$getAuth(); //if loggedin will return user object, if not return null
    }
    
    function sendWelcomeEmail(emailAddress) {
      firebaseDataService.emails.push({
        emailAddress: emailAddress
      })
    }
  }
})();
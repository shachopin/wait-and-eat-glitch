(function() {
  'use strict';
  
  angular
    .module('app.auth')
    .factory('authService', authService); 
  
  function authService($firebaseAuth, firebaseDataService, partyService) {
    //return an object
    var firebaseAuthObject = $firebaseAuth();
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
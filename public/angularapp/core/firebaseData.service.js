(function() {
  'use strict';
  
  angular
    .module('app.core')
    .factory('firebaseDataService', firebaseDataService); 
  
  function firebaseDataService() {
    //return an object
    
    var root = firebase.database().ref();

    var service = {
      root: root,
      users: root.child("users"),
      emails: root.child("emails"),
      textMessages: root.child('textMessages')
    };

    return service;
    
    /////////////
    
    
  }
})();
(function() {
  'use strict';
  
  angular
    .module('app.core')
    .factory('textMessageService', textMessageService); 
  
  function textMessageService(firebaseDataService) { //injecting service to service is just like injecting service to a controller
    //return an object
    
    var service = {
      sendTextMessage: sendTextMessage
    };
    
    return service;
    
    /////////////
    
    function sendTextMessage(party, parties) {
      var newTextMessage = {
        phoneNumber: party.phone,
        size: party.size,
        name: party.name
      };
      firebaseDataService.textMessages.push(newTextMessage);
      //fireTextMessages.push(newTextMessage); //textMessages table got a new record 
      //here you are adding a record by pure firebase js, not angularfirebase.js which you used in vm.parties.$add()
      //because you are not showing text messages on the UI, it's not a two-way binding to database and UI
      party.notified = true;  //local change, need to save to firebase
      parties.$save(party); //$save is the method on firebaseArray
    }
    
    
  }
})();
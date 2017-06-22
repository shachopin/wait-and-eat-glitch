(function() {
  'use strict';
  
  angular
    .module('app.core')
    .factory('partyService', partyService); 
  
  function partyService($firebaseArray, firebaseDataService) {
    var parties = null;
    
    //return an object
    var service = {
      Party: Party,
      getPartiesByUser: getPartiesByUser,
      //parties: $firebaseArray(firebaseDataService.root.child('parties')) //almost like firebase.database().ref('parties'); //no longer need this
      reset: reset
    };
    
    return service;
    
    /////////////
    
    function Party() {
      this.name = '';
      this.phone = '';
      this.size = '';
      this.done = false;
      this.notified = false;
    }
    
    function getPartiesByUser(uid) {
      if (!parties) {
        parties = $firebaseArray(firebaseDataService.users.child(uid).child('parties'));
      }
      //return $firebaseArray(firebaseDataService.users.child(uid).child('parties')); 
      //initally like this, no good, why always have to reesablish the connection
      //need to use memoization, establish the connection once
      return parties;
      /*
      the new table structure looks like this
      users
         uid1 (for user1)
            parties
               party1
               party2
         uid2 (for user2)
            parties
               party1
               party2
      after this change, can remove the parties table inside firebase console
      */
    }
    
    function reset() {  //to be used in authService logout function, to solve the perssion error, enforced by the security rule. If without security rule, this is not needed
      //break the connection to firebase established by $firebaseArray (for the 2-way binding all the way to db to be possible)
      //why break it?
      //because otherwise,  if we log out, there will be permission error. Why?
      //because we have security rule set up for parties data
      //logged out then cannot get parties data
      //but if the connection is still maintained, error out
      if (parties) {
        parties.$destroy();
        parties = null;
      }
    }
  }
})();
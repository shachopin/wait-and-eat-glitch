(function() {
  'use strict'
 
  angular
   .module('app.waitList')
   .directive('ddPartyTable', ddPartyTable);

  function ddPartyTable() {
    return {
      templateUrl: '/angularapp/waitList/directives/partyTable.html',
      restrict: 'E',
      controller: PartyTableController,
      controllerAs: 'vm',
      bindToController: true, //without this, you have to use a $scope service in order to use parties in controller
      //bindgToController ture will make the parties property directly in this controller as this
      //notice now the $scope.parties no longer work, also in directive, you cannot just directly use {{parties}}
      scope: {
        parties: '='  //two-way binding between this directive controller and waitListController
      }
    };
  }
  
  function PartyTableController(textMessageService) {
    var vm = this;
    
    vm.removeParty = removeParty;
    vm.sendTextMessage = sendTextMessage;
    vm.toggleDone = toggleDone;

  
    function removeParty(party) { //can check firebase API doc
      vm.parties.$remove(party);  //firebase remove
    }

    function sendTextMessage(party) { //you have access to the party object
       textMessageService.sendTextMessage(party, vm.parties);
      // var newTextMessage = {
      //   phoneNumber: party.phone,
      //   size: party.size,
      //   name: party.name
      // };
      // firebaseDataService.textMessages.push(newTextMessage);
      // //fireTextMessages.push(newTextMessage); //textMessages table got a new record 
      // //here you are adding a record by pure firebase js, not angularfirebase.js which you used in vm.parties.$add()
      // //because you are not showing text messages on the UI, it's not a two-way binding to database and UI
      // party.notified = true;  //local change, need to save to firebase
      // vm.parties.$save(party); //$save is the method on firebaseArray
    }

    function toggleDone(party) {
      vm.parties.$save(party);  //firebase save for update
    }
  }
 })();
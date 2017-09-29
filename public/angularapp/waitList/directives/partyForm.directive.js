(function() {
  'use strict'
 
  angular
   .module('app.waitList')
   .directive('ddPartyForm', ddPartyForm);

  function ddPartyForm() {
    return {
      templateUrl: '/angularapp/waitList/directives/partyForm.html',
      restrict: 'E',
      controller: PartyFormController, //if you don't sepcify a directive controller here and give it isolate scope, will be using waitListController which is the parent controller
      controllerAs: 'vm',
      bindToController: true, //without this, you have to use a $scope service in order to use parties in controller
      //bindgToController true will make the parties property directly in this controller as this
      //notice now the $scope.parties no longer work, also in directive, you cannot just directly use {{parties}}
      //on the directive page, you have to call parties with reference vm, like vm.parties
      scope: {
        parties: '='  //two-way binding between this directive controller and waitListController
      }
    };
  }
  
  function PartyFormController(partyService) {
    var vm = this;
    
    vm.newParty = new partyService.Party();
    vm.addParty = addParty;
    
    function addParty() {
      //vm.parties.push("another");
      //vm.parties.$add('another'); // $add is firebaseArray method 
      vm.parties.$add(vm.newParty); //firebase add
      vm.newParty = new partyService.Party();
    }
  }
 })();
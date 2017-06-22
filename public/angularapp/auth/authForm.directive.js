(function() {
  'use strict';
  
  angular
    .module('app.auth')
    .directive('ddAuthForm', ddAuthForm);
  
  function ddAuthForm() {
    return {
      templateUrl: '/angularapp/auth/authForm.html',
      restrict: 'E',
      controller: AuthFormController,
      controllerAs: "vm",
      bindToController: true,//without this, you have to use a $scope service in order to use parties in controller
      //bindgToController ture will make the parties property directly in this controller as this
      //notice now the $scope.parties no longer work, also in directive, you cannot just directly use {{parties}}
      //so now you have to ng-bind="vm.formTitle" or {{vm.formTitle}}, 
      //Without bindToController: true, you can say ng-bind="formTitle" or {{formTitle}}
      scope: {
        error: '=', //two way binding for object
        formTitle: '@', //binding string, one way, string is immutable
        submitAction: '&' //binding functional expression
      }
    };
  }
  
  function AuthFormController() {
    var vm = this;
    
    // vm.user = {  //not needed, but in the original code
    //   email: '',
    //   password: ''
    // };
  }
})();
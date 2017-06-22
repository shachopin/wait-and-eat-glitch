(function() {
  'use strict';
  
  angular
    .module('app.layout')
    .directive('ddNavbar', ddNavbar);
  
  function ddNavbar() {
    return {
      templateUrl: '/angularapp/layout/navbar.html',
      restrict: 'E',
      scope: {},
      controller: NavbarController,
      controllerAs: "vm"
    };
  }
  
  function NavbarController($location, authService) {
    var vm = this;
    vm.isLoggedIn = authService.isLoggedIn;
    vm.logout = logout;
    
    function logout() {
      authService.logout();
      $location.path("/");
    }
  }
})();
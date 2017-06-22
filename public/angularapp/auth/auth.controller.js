(function(){
  'use strict';

  angular
    .module('app.auth')  //three options down below for dependency injection
    //.controller('WaitListController', ['$firebaseArray', WaitListController]);  -- option 1
    //works, then you can say function WaitListController(fb) down below
    //name can be anything(e.g. fb), because it's positional
    // you can say WaitLstController.$inject = ['$firebaseArray'] as well, but not necessary - Dependency Injection  -- option 2
    .controller('AuthController', AuthController);
  function AuthController($location, authService) { //option 3
    var vm = this;
  
    vm.register = register;
    vm.login = login;
    //vm.logout = logout; //because only used in navbar. now in NavbarController
    //vm.isLoggedIn = authService.isLoggedIn; //because only used in navbar, now in NavbarController
    vm.error = null;
    
    function register(user) {
      /*return*/ // no need to rturn as in the original code
      authService.register(user)
       .then(function() {
        //console.log(user); //user email has to be unique
        return vm.login(user);  //it's funny, sending email to shachopin+newaccount@gmail.com works and sends it to shachopin@gmail.com, actually shachopin+anything@gmail.com works
      }) //will now automatically log in
       .then(function() {
        return authService.sendWelcomeEmail(user.email);
      })
       .catch(function(error) {
        console.log(error); //if you register an existing user, you will get error
        vm.error = error;
      });
    }
    
    function login(user) {
      /*return*/ // no need to rturn as in the original code
      authService.login(user)
      .then(function(loggedInUser) {
        console.log(loggedInUser);
        $location.path('/waitList');
      })
      .catch(function(error) {
        console.log(error);     
        vm.error = error;
      });
    }
    
    // function logout() {  //because only used in navbar. now in NavbarController
    //   authService.logout();
    //   $location.path('/'); //no # in $location
    // }
  }

})();


/* Orginal
function AuthController($location, $firebaseAuth) {
    var vm = this;
    var firebaseAuthObject = $firebaseAuth();
    vm.user = {
      email: "",
      password: ""
    }
    vm.register = register;
    vm.login = login;
    vm.logout = logout;
  
    function register(user) {
      firebaseAuthObject.$createUserWithEmailAndPassword(user.email, user.password)
      .then(function() {
        vm.login(user);
      }).catch(function(error) {
        console.log(error);
      });
    }
    
    function login(user) {
      firebaseAuthObject.$signInWithEmailAndPassword(user.email, user.password)
      .then(function(loggedInUser) {
        console.log(loggedInUser);
        $location.path("/waitList");
      }).catch(function(error) {
        console.log(error);
      });
    }
    
    function logout() {
      //partyService.reset(); //to fix the permission error after enforced by adding security rules
      firebaseAuthObject.$signOut();
      $location.path("/");
    }
    
//     function isLoggedIn() {
//       return firebaseAuthObject.$getAuth(); //if loggedin will return user object, if not return null
//     }
    
  }


*/
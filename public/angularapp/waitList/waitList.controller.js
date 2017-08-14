(function(){
  'use strict';

  angular
    .module('app.waitList')  //three options down below for dependency injection
    //.controller('WaitListController', ['$firebaseArray', WaitListController]);  -- option 1
    //works, then you can say function WaitListController(fb) down below
    //name can be anything(e.g. fb), because it's positional
    // you can say WaitLstController.$inject = ['$firebaseArray'] as well, but not necessary - Dependency Injection  -- option 2
    .controller('WaitListController', WaitListController);
  function WaitListController(partyService, user) { //option 3  //CONTROLLER HAS TO BE THIN AND SIMPLE!!!!!
    var vm = this;
    //var fireParties = firebase.database().ref('parties');  //moved to firebaseData.service.js
    //var fireTextMessages = firebase.database().ref('textMessages'); //no need to use angularfire's $firebaseArray for this
    //because it's only in firebase, not shown on UI

    //console.log(user) // logged in user object injected by waitList config.route.js
    // vm.newParty = new partyService.Party(); //moved to partyForm directive controller
    //vm.parties = [1,2,3,4];
    //vm.parties = $firebaseArray(fireParties);
    //vm.parties = partyService.parties;
    vm.parties = partyService.getPartiesByUser(user.uid);
    //the above statement will be the only method in waitListControler, it feeds data to two child directives (partyForm and partyTable)
    
    // vm.addParty = addParty;  //moved to partyForm directive controller
    //vm.removeParty = removeParty; //moved to partyTable directive controller
    //vm.sendTextMessage = sendTextMessage; //moved to partyTable directive controller
    //vm.toggleDone = toggleDone; //moved to partyTable directive controller

    // function addParty() {  //moved to partyForm directive controller
    //   //vm.parties.push("another");
    //   //vm.parties.$add('another'); // $add is firebaseArray method 
    //   vm.parties.$add(vm.newParty); //angular firebaseArray add
    //   vm.newParty = new partyService.Party();
    // }

    // function removeParty(party) { //can check firebase API doc  //moved to partyTable directive controller
    //   vm.parties.$remove(party);  //angular firebaseArray remove
    // }

    // function sendTextMessage(party) { //you have access to the party object //moved to partyTable directive controller
    //    textMessageService.sendTextMessage(party, vm.parties);
    //   // var newTextMessage = {
    //   //   phoneNumber: party.phone,
    //   //   size: party.size,
    //   //   name: party.name
    //   // };
    //   // firebaseDataService.textMessages.push(newTextMessage);
    //   // //fireTextMessages.push(newTextMessage); //textMessages table got a new record 
    //   // //here you are adding a record by pure firebase js, not angularfirebase.js which you used in vm.parties.$add()
    //   // //because you are not showing text messages on the UI, it's not a two-way binding to database and UI
    //   // party.notified = true;  //local change, need to save to firebase
    //   // vm.parties.$save(party); //$save is the method on firebaseArray
    // }

    // function toggleDone(party) {  //moved to partyTable directive controller
    //   vm.parties.$save(party);  //firebase save for update
    // }
  }

})();
//Using firebase (with the help of angularfire) is like two-way databinding UI all the way to database level, 
//changes happens automatically realtime, no refresh anything

//some house keeping:

// https://sms-client-wait-eat.glitch.me/
// backend is talking to
// https://sms-server-wait-eat.glitch.me/
// and also connecting to
// dawei-sms-server.herokuapp.com
// https://dashboard.heroku.com/apps/dawei-sms-server (https://github.com/shachopin/sms-server)

//both server will go idle, so sms cannot be sent
//for heroku, there is a way to prevent the dynmo from going idel
//http://stackoverflow.com/questions/5480337/easy-way-to-prevent-heroku-idling


// You can install the free New Relic add-on. It has an availability monitor feature that will ping your site twice per minute, thus preventing the dyno from idling.
// More or less the same solution as Jesse but maybe more integrated to Heroku... And with a few perks (performance monitoring is just great).
// install New Relic APM addon to your dawei-sms-server app on heroku https://elements.heroku.com/addons/newrelic

//Note: to all those saying it doesn't work: the important part in my answer is "availability monitor". Just installing the addon won't help. You also need to setup the availability monitoring with the URL of your heroku app.

//how to set the availability monitor:
//https://docs.newrelic.com/docs/alerts/new-relic-alerts/managing-notification-channels/availability-monitoring-legacy

//or
//quickleft.com/blog/6-easy-ways-to-prevent-your-heroku-node-app-from-sleeping/
//I used the js http pinger inside server.js of both my heroku sms server and gomix sms server

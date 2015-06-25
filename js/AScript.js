/****** The Main App *************/
var mainApp = angular.module('mainApp', ['ngRoute']);

/*** The Shared Service ***/
mainApp.service('sharedVars',['$rootScope', function ($rootScope) {
   var sharedVars = {};
   sharedVars.classPageId = 'loginPage';

   sharedVars.changePageID = function (pageID) {
      console.log(pageID);
      this.classPageId = pageID;
      this.NotifyPageChange();
   };

   sharedVars.NotifyPageChange = function () {
      $rootScope.$broadcast('pageChange');
   }
 
   return sharedVars;
}]);

/****** The Main Controller *****/
mainApp.controller('mainCtrl', ['$scope', 'sharedVars', function ($scope, sharedVars) {
	$scope.topMenu = ['Menu Item 1', 'Menu Item 2', 'Menu Item 3', 'Menu Item 4', 'Menu Item 5', 'Menu Item 6'];
   $scope.leftMenu = ['Side Item 1', 'Side Item 2', 'Side Item 3', 'Side Item 4', 'Side Item 5', 'Side Item 6'];
   $scope.classPageId = "loginPage";
   $scope.$on('pageChange', function () {
      $scope.classPageId = sharedVars.classPageId;
   }) 
}]);

/****** lets do the routing ***********/
mainApp.config(['$routeProvider',
         function($routeProvider) {
            $routeProvider.
               when('/login', {
                  templateUrl: 'partials/login.html',
                  controller: 'loginCtrl'
               })
               .when('/friends', {
                  templateUrl: 'partials/people.html',
                  controller: 'peopleCtrl'
               })
               .when('/', {
               		redirectTo: '/login'
               })
               .otherwise({
               		redirectTo: '/'
               });
         }]);

/***** Routing Controllers ***********/
mainApp.controller('peopleCtrl', ['$scope', 'sharedVars', function ($scope, sharedVars) {
   //$('body').removeClass().addClass('generalPage');
   sharedVars.changePageID('people');
	$scope.items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8', 'Item 9', 'Item 10', 'Item 11', 'Item 12'];
   
}]);

/***************************************************************************************
**************************** Login Controller Start ***********************************
***************************************************************************************/
mainApp.controller('loginCtrl', ['$scope', 'sharedVars', function ($scope, sharedVars) {
   //$('body').removeClass().addClass('loginPage');
   sharedVars.changePageID('loginPage');
   $scope.user = {};
   $scope.user.firstName = '';
   $scope.user.lastName = '';
   $scope.user.email = '';
   $scope.user.password = '';
   $scope.user.rePassword = '';
   
   $scope.fnameOk = true;
   $scope.lnameOk = true;
   $scope.rePswdOk = true;
   $scope.pswdOk = true;
   $scope.emailOk = true;

   //validate first name
   $scope.validateFname = function () {
      var fname = $scope.user.firstName;
      if(fname.length <= 30 && /^[A-Z\s]+$/i.test(fname)) {
         $scope.fnameOk = true;
      } else {
         $scope.fnameOk = false;
      }
      return($scope.fnameOk);
   };

   //validate first name
   $scope.validateLname = function () {
      var lname = $scope.user.lastName;
      if(lname.length <= 30 && /^[A-Z\s]+$/i.test(lname)) {
         $scope.lnameOk = true;
      } else {
         $scope.lnameOk = false;
      }
      return($scope.lnameOk);
   };

   //validation: email address
   $scope.validateEmail = function () {
      if(/^[A-Z0-9._-]{1,}@[A-Z0-9_-]{1,}[.]{1}[A-Z0-9._-]{1,}$/i.test($scope.user.email)) {
         $scope.emailOk = true;
      } else {
         $scope.emailOk = false;
      }
      return($scope.emailOk);
   };

   //validation: pswd length must be min 8 and only letters numbers  @ # $
   $scope.validatePswd = function () {
      var pwd = $scope.user.password;
      if(pwd.length >= 8 && /^[a-zA-Z@#$\d]+$/.test(pwd)) {
         $scope.pswdOk = true;
      } else {
         $scope.pswdOk = false;
      }
      $scope.validateRePswd();
      return($scope.pswdOk);
   };

   //validation: repswd should be = pswd
   $scope.validateRePswd = function () {
      if($scope.user.password === $scope.user.rePassword) {
         $scope.rePswdOk = true;
      } else {
         $scope.rePswdOk = false;
      }
      return($scope.rePswdOk);
   };

   //signup button pressed
   $scope.signup = function () {console.log('signup');
      //check if all validations return true
      if($scope.validateFname() && $scope.validateLname() && $scope.validateEmail() && $scope.validatePswd() && $scope.validateRePswd()) {
         console.log("all fields look good... to be Signed Up...");
      } else {
         console.log("Correct the errors first...");
      }
   };

}]);
////////////////////////// Login Controller End ////////////////////////////////////////

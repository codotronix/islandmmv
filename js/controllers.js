/****** The Main App *************/
var mainApp = angular.module('mainApp', ['ngRoute']);



/****** The Main Controller *****/
mainApp.controller('mainCtrl', ['$scope', 'srvc_sharedVars', function ($scope, srvc_sharedVars) {
	$scope.topMenu = ['Menu Item 1', 'Menu Item 2', 'Menu Item 3', 'Menu Item 4', 'Menu Item 5', 'Menu Item 6'];
   $scope.leftMenu = ['Side Item 1', 'Side Item 2', 'Side Item 3', 'Side Item 4', 'Side Item 5', 'Side Item 6'];
   $scope.classPageId = "loginPage";
   $scope.$on('pageChange', function () {
      $scope.classPageId = srvc_sharedVars.classPageId;
   }) 
}]);



/***** Routing Controllers ***********/
mainApp.controller('peopleCtrl', ['$scope', 'srvc_sharedVars', function ($scope, srvc_sharedVars) {
   //$('body').removeClass().addClass('generalPage');
   srvc_sharedVars.changePageID('people');
	$scope.items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8', 'Item 9', 'Item 10', 'Item 11', 'Item 12'];
   
}]);

/***************************************************************************************
********************** Login Controller Start ***********************************
***************************************************************************************/
mainApp.controller('loginCtrl', ['$scope', 'srvc_sharedVars', 'srvc_validateForm', function ($scope, srvc_sharedVars, srvc_validateForm) {
   
   srvc_sharedVars.changePageID('loginPage');
   srvc_validateForm.bindValidations('signUpForm');  

   $scope.signup = function () {
      srvc_validateForm.isErrorFree('signUpForm');
   };

}]);
////////////////////////// Login Controller End ////////////////////////////////////////

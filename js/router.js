var mainApp = angular.module('mainApp');

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
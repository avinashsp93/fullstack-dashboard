var dashboardApp = angular.module('DashboardApp',['ngRoute'])

  .config(['$routeProvider', '$locationProvider', function($routeProvider,$locationProvider){
    $locationProvider.hashPrefix('');
    $routeProvider
      .when('/infractions',{
        templateUrl: 'partials/infractions.html'
      }).when('/frontpage',{
        templateUrl: 'partials/frontpage.html'
      });
  }])

  .controller('MyDashboard',['$scope','$http',function($scope,$http){
    console.log('In Dashboard Controller');
    $scope.school_name = "";
    $scope.dd = false;
    $scope.infractionsFlagCount = false;

    var loadInfractions = function(id, firstName, lastName) {
      $scope.studentName = firstName + ' ' + lastName;
      $http({
        method: 'POST',
        url: 'php/midware.php',
        data: $.param({
          "flag":"loadInfractions",
          "student_id":id
        }),
        headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}
      }).then(function(response){
        $scope.infractions = response.data;
        console.log(response.data);
        $scope.infractionsFlagCount = true;
      },function(error){
        console.log("Error: ", error);
      });
    }
    $scope.loadInfractions = loadInfractions;

    $http.get('php/midware.php?flag=populateStudentDetails').then(function(response) {
      $scope.students = response.data;
    });
  }]);

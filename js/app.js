var dashboardApp = angular.module('DashboardApp',[])
  .controller('MyDashboard',['$scope','$http',function($scope,$http){
    console.log('In Dashboard Controller');
    $scope.school_name = "";
    $scope.dd = false;
    $scope.infractionsFlagCount = false;

    $("#inf").click(function() {
      console.log('Hi');
      $('html,body').animate({
        scrollTop: $("#infractionsTable").offset().top},
        'slow');
    });

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

      // var data = $.param({
      //   flag: 'loadInfractions',
      //   student_id: '1024655'
      // });
      //
      // var config = {
      //   headers: {
      //     'Content-type': 'application/x-www-form-urlencoded;charset=utf-8;'
      //   }
      // }
      //
      // $http.post('php/midware.php',data,config).then(function (data, status, headers, config) {
      //   console.log(data);
      // })

    }
    $scope.loadInfractions = loadInfractions;

    $http.get('php/midware.php?flag=populateStudentDetails').then(function(response) {
      $scope.students = response.data;
    });

  }]);

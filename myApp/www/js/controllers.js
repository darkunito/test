angular.module('starter.controllers', [])

.constant('ApiEndpoint', {
    url: 'http://localhost:8080/api'
})
.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('homeCtrl', function($scope, $stateParams) {
    $scope.message = "¡Bienvenido!";
  })


.controller('subjectsCtrl', function($scope, $http, ApiEndpoint) {
    $scope.message = "Página asignaturas";
    $scope.subjects = {};

    // Obtenemos todas las asignaturas
    $http.get(ApiEndpoint.url + '/subject').success(function(data) {
        $scope.subjects = data;
        console.log('Get Data: ' + data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });

})

.controller('subjectsDetailCtrl', function($scope, $http, ApiEndpoint, $state) {

    $scope.message = "Estudiantes matriculados";
    $scope.subjectID = ($state.params.subjectId); //Obtenemos ID de la URI de subjectId
    console.log($scope.subjectID);

    //Obtenemos detalle estudiante
    $http.get(ApiEndpoint.url + '/subject/' + $scope.subjectID)
      .success(function(data) {
        $scope.subject = data;
        console.log($scope.subject);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });

    // Función para eliminar estudiante
    $scope.remove = function(id) {
      $http.delete(ApiEndpoint.url + '/student/' + id)
        .success(function(data) {
          //$scope.newStudent = {};
          //$scope.students = data;
          //$scope.selected = false;
          console.log("Estudiante", id, "eliminado correctamente.", data);
          $state.go('app.students');
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    };

})

.controller('studentsCtrl', function($scope, $http, ApiEndpoint) {
  $scope.message = "Página estudiantes";
  $scope.students = {};

  // Obtenemos todos los estudiantes
  $http.get(ApiEndpoint.url + '/student').success(function(data) {
    $scope.students = data;
    console.log('Get Data: ' + data);
  })
  .error(function(data) {
    console.log('Error: ' + data);
  });

})

.controller('studentsDetailCtrl', function($scope, $http, ApiEndpoint, $state) {

  $scope.message = "Detalle estudiante";
  $scope.studentID = ($state.params.studentId); //Obtenemos ID de la URI
  console.log($scope.studentID);

  //Obtenemos detalle estudiante
  $http.get(ApiEndpoint.url + '/student/' + $scope.studentID)
    .success(function(data) {
      $scope.student = data;
      console.log($scope.student);
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });

  // Función para eliminar estudiante
  $scope.remove = function(id) {
    $http.delete(ApiEndpoint.url + '/student/' + id)
      .success(function(data) {
        //$scope.newStudent = {};
        //$scope.students = data;
        //$scope.selected = false;
        console.log("Estudiante", id, "eliminado correctamente.", data);
        $state.go('app.students');
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };



});

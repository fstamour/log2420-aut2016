var app = angular.module('seance', []);

app.controller('seanceCtrl', function($scope, $http, $sce) {
    $scope.firstName= "John";
    $scope.lastName= "Doe";

    // Chargement des seances
    $http.get("seances.json").then(function(response) {
	$scope.seances = angular.forEach(response.data, function (seance, index, tableau) {
	    tableau[index] = angular.forEach(seance, function(valeur, cle, tableau) {
		tableau[cle] = $sce.trustAsHtml(valeur);
	    });
	});
    });

    $http.get("menu.json").then(function(response) {
	$scope.menu = response.data;
    });
});

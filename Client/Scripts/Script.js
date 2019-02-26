/// <reference path="angular.js" />
/// <reference path="angular-route.js" />

var app = angular
            .module("MicroSense", ["ngRoute"])
            .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
                $routeProvider
                    .when("/", {
                        templateUrl: "Templates/RFID-Readers.html",
                        controller: "homeController"
                    })
					.otherwise({redirectTo: '/'})
            }])
            .controller("homeController", function (ApiService, $scope, $http, $q) {
                $scope.message = "RFID Readers Main Control Page";
				$scope.model = {};
				
				var readersPromise = ApiService.getReaders();
				var healthPromise = ApiService.getHealth();
				
				var promise = ApiService.getReadersWithHealth(readersPromise, healthPromise);
				promise.then(function (readersWithHealth) {
					$scope.readers = readersWithHealth;
				});
				
				var operationsPromise = ApiService.getOperations();
				operationsPromise.then(function(listOfOperationObjects) {
					$scope.operations = listOfOperationObjects;
				});
				
				$scope.StartJob = function() {
								  
					var checkedReaders = ApiService.getCheckedReadersList($scope.readers);
					var overallHealthState = ApiService.getOverallHealthStateOfCheckedReaders($scope.readers);
					var selectedOperation = ApiService.getOperationSelected($scope.model.operation);
					
					var payload = {
									operation: selectedOperation,
									readers: checkedReaders
								  };
					
					if(overallHealthState == "ERROR")
					{
						$scope.JobOutput = "The job cannot be started as one or more of the readers selected is in ERROR state";
						return;
					}
					
					$http.post('/jobs', JSON.stringify(payload))
						.then(function(response) {
							
							if(overallHealthState == "WARNING")
							{							
								$scope.JobOutput = "The job has started \nwith operation: " + selectedOperation + 
													" \non readers: " + checkedReaders + " \nwith a health status of: " + overallHealthState;
							}
							else
							{							
								$scope.JobOutput = "The job has started \nwith operation: " + selectedOperation + 
													" \non readers: " + checkedReaders;
							}	
						})
						.catch(function(response) {
								$scope.JobOutput = "Job failed with following response from server: " + response.data;
						});
				}				
            });
				


/// <reference path="Script.js" />
				

app.factory('ApiService', function($http, $q) {
  return {
	  
    getReaders: function() {
      var promise = $http.get('/readers').then(function (response) {
        return response.data;
      });
	  
      // Return the promise to the controller
      return promise;
    },
	
	getHealth: function() {
      var promise = $http.get('/health').then(function (response) {
        return response.data;
      });
	  
      // Return the promise to the controller
      return promise;
    },
	
	getOperations: function() {
		
		var promise = $http.get('/operations').then(function (response) {
			
			var listOfOperations = response.data;
			var listOfOperationObjects = new Array();
			
			for(var i = 0; i < listOfOperations.length; i++)
			{
				var obj = { 
							name : listOfOperations[i],
							checked : false
						  };
				listOfOperationObjects.push(obj);
			}
			return listOfOperationObjects;
		});
		
      // Return the promise to the controller
		return promise;
	},
	
	getReadersWithHealth: function(readersPromise, healthPromise) {
		var readersWithHealthPromise = 
				$q.all([readersPromise, healthPromise])
					.then(function(values) {
						var allReaders = values[0];
						var healthOfReaders = values[1];
				
						var listOfReadersWithHealth = new Array();
						
						for(var i = 0; i < allReaders.length; i++)
						{
							var health = "ACTIVE";
							for(var j = 0; j < healthOfReaders.length; j++)
							{
								if(allReaders[i].name == healthOfReaders[j].reader)
								{
									health = healthOfReaders[j].status;
									break;
								}
							}
							
							var obj = {
										name: allReaders[i].name,
										type: allReaders[i].type,
										address: allReaders[i].address,
										health: health,
										checked: false
									  };
									  
							listOfReadersWithHealth.push(obj);
						}
						
						return listOfReadersWithHealth;
					}
				);
		return readersWithHealthPromise;
	},
				
	getCheckedReadersList: function(readersList) {
					var checkedReadersNames = [];
					
					for(var i = 0; i < readersList.length; i++)
					{
						if(readersList[i].checked)
						{
							checkedReadersNames.push(readersList[i].name);
						}
					}
					
					return checkedReadersNames;
		
				},
				
	getOverallHealthStateOfCheckedReaders: function(readersList) {
					var inErrorState = false;
					var inWarningState = false;
					
					for(var i = 0; i < readersList.length; i++)
					{
						if(readersList[i].checked)
						{
							if(readersList[i].health == "ERROR")
							{
								inErrorState = true;
							}
							else if(readersList[i].health == "WARNING")
							{
								inWarningState = true;
							}
						}
					}
					
					// get overall health state of selected readers
					var overallHealthState = inErrorState? "ERROR" : (inWarningState ? "WARNING" : "ACTIVE");
					
					return overallHealthState;
	},
	
	getOperationSelected: function(operationChecked) {
					
					if(operationChecked == null)
					{
						checkedOperation = null;
					}
					else
					{
						checkedOperation = operationChecked.name;
					}
					
					return checkedOperation;
	}
  }
});
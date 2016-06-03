'use strict';

/* Controller */
angular.module('myApp.controllers', []).
	controller('AppCtrl', function ($scope, $http) {
		// Insert controller code here

		$http.get('/api/quote', null).
		then(function(res) {
			$scope.data = res.data;

		},
		function(res) {
			$scope.data = res.data || 'failed';
			var shippingCost; 
			if(weight <= 0.4) {
				if(numItems < 48) {
					shippingCost += numItems;
				} else if(numItems >= 48) {
					shippingCost = 0.48*numItems;
				}
				
			} else {
				if(numItems < 48) {
					shippingCost = 0.5*numItems;
				} else if(numItems >= 48) {
					shippingCost = 0.25*numItems;
				}
			}

			finalCost *= 0.07;
			finalCost += shippingCost;

			var markup; 

			if(finalCost <= 800) {
				finalCost = (0.5*finalCost) + finalCost;
			} else if(finalCost > 800) {
				finalCost = (0.45*finalCost) + finalCost;
			}

		});
		
	});
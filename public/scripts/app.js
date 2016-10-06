// What's good...?
console.log("It's all good in tha hood...");

// Init Tunely Angular app
angular.module('tunely', [])
.controller('AlbumsIndexController', AlbumsIndexController);


// Albums Controller
AlbumsIndexController.$inject = ['$http'];
	function AlbumsIndexController( $http ) {

	var vm = this;
	vm.newAlbum = {name: "", artistName: ""};
	vm.allAlbums = [];

	// vm.newAlbum = {
	// 	name: "License to Ill",
	// 	artistName: "Beastie Boys"
	// };

	// Render all albums to view call
	loadAllAlbums();

	// Render all albums to view function
	function loadAllAlbums() {
		$http ({
			method: "GET",
			url: "/api/albums"
		}).then(function loadAllAlbumsSuccess(response) {
			vm.allAlbums = response.data;
		}, function loadAllAlbumsError(response) {
			console.log("Looks like we have a problem... " + response )
		})
	};

	// Create a new album from view form
	vm.createAlbum = function () {
	  $http({
	    method: 'POST',
	    url: '/api/albums',
	    data: vm.newAlbum
	  }).then(function successCallback(response) {
	  	vm.allAlbums.push(response.data);
	  	vm.newAlbum = {};
	  	console.log(response.data);
	  }, function errorCallback(response) {
	    console.log('There was an error posting the data', response);
	  });
	}


}; // End AlbumsIndexController

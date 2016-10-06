console.log("It's all good...");

/* CLIENT-SIDE JS
 *
 * This is your main angular file. Edit as you see fit.
 *
 */

angular
  .module('tunely', [])
  .controller('AlbumsIndexController', AlbumsIndexController);

AlbumsIndexController.$inject = ['$http'];

function AlbumsIndexController ($http) {
  var vm = this;
  vm.newAlbum = {};
  vm.newAlbum = {
    name: '',
    artistName: ''
  };

  $http({
    method: 'GET',
    url: '/api/albums'
  }).then(function successCallback(response) {
    vm.albums = response.data;
  }, function errorCallback(response) {
    console.log('There was an error getting the data', response);
  });

  vm.createAlbum = function () {
    $http({
      method: 'POST',
      url: '/api/albums',
      data: vm.newAlbum,
    }).then(function successCallback(response) {
      vm.albums.push(response.data);
    }, function errorCallback(response) {
      console.log('There was an error posting the data', response);
    });
  }

  vm.editAlbum = function (album) {
  $http({
    method: 'PUT',
    url: '/api/albums/' + album._id,
    data: album
    }).then(function successCallback(json) {
      console.log(album.name + " " + "has been updated...")
    }, function errorCallback(response) {
      console.log('There was an error editing the data', response);
    });
  }

  vm.deleteAlbum = function(album) {
    $http({
      method: 'DELETE',
      url: '/api/albums/' + album._id
    }).then(function deleteAblumSuccess(response) {
      var albumToDelete = vm.albums.indexOf(album);
      console.log("Deleted " + album.name + " by " + album.artistName);
      vm.albums.splice(albumToDelete, 1);
    }, function deleteAlbumError(response) {
      console.log("Unable to delete album...");
    })
  };

};

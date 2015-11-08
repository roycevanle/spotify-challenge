//Create application
var data;
var baseUrl = 'https://api.spotify.com/v1/search?type=track&query='
var myApp = angular.module('myApp', [])

//Bind controller, passing in $scope, $http
var myCtrl = myApp.controller('myCtrl', function($scope, $http) {
  $scope.audioObject = {}

  //To get song data
  $scope.getSongs = function() {
    $http.get(baseUrl + $scope.track).success(function(response){
      data = $scope.tracks = response.tracks.items 
    })
  }

  //To play snip of song
  $scope.play = function(song) {
    if($scope.currentSong == song) {
      $scope.audioObject.pause()
      $scope.currentSong = false
      return
    }
    else {
      if($scope.audioObject.pause != undefined) $scope.audioObject.pause()
      $scope.audioObject = new Audio(song);
      $scope.audioObject.play()
      $scope.currentSong = song
    }
  }

  //Shows popular statement
  $scope.popular = function(popular, songName, artists) {
    $("#result").hide();
    $("#popular").append("<p>On a popularity scale of 0-100, " + songName + " by " + artists + " is a " + popular + "</p>");
    console.log(popular);
    console.log(songName);
    console.log(artists);
    drawChart(popular);
  }

  //Draw chart
  function drawChart(popularity) {
      var popData = google.visualization.arrayToDataTable([
           ['Popularity', popularity],
      ], true);

      var options = {
          width: 300, height: 120,
          minorTicks: 5
      };

      var chart = new google.visualization.Gauge(document.getElementById('chart_div'));
      chart.draw(popData, options);
  }

}) //Ends controller


// Add tool tips to anything with a title property
$('body').tooltip({
    selector: '[title]'
});

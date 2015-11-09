//Create application
var data;
var baseUrl = 'https://api.spotify.com/v1/search?type=track&query='
var myApp = angular.module('myApp', [])

//Bind controller, passing in $scope, $http
var myCtrl = myApp.controller('myCtrl', function($scope, $http) {
  $scope.audioObject = {}

  //Hides the Stop Track Preview button initially
  $("#masterPopular").hide();

  //To get song data
  $scope.getSongs = function() {
    $http.get(baseUrl + $scope.track).success(function(response){
      data = $scope.tracks = response.tracks.items
      //Makes sure results show each time something is searched
      $("#result").show();
      //Makes sure the popuar calculation is hidden when searching
      $("#masterPopular").hide();
      //Depopulates all elements in the popular class for future population
      $("#popular").html("");
    })
  }

  //To play snip of song
  $scope.play = function(song) {
    if($scope.currentSong == song) {
      $scope.audioObject.pause();
      $scope.currentSong = false;
      return
    }
    else {
      if($scope.audioObject.pause != undefined) $scope.audioObject.pause();
      $scope.audioObject = new Audio(song);
      $scope.audioObject.play();
      $scope.currentSong = song;
    }
  }

  //Shows popular statement
  $scope.popular = function(popular, songName, artists) {

    //Hides the result of search when user specifies song
    $("#result").hide();

    //Shows the popularity result of their specified song
    $("#masterPopular").show();

    //Appends div for the chart that will be drawn
    $("#popular").append("<div id='chart_div'></div");

    //Appends popularity message to user
    $("#popular").append("<p>On a popularity scale of 0-100, " + songName + " by " + artists + " is a " + popular + "</p>");
    if (popular < 51) {
      $("#popular").append("<p>Your music taste is not 'in' at all! Your music is underground!</p>");
    }else if ( 50 < popular && popular < 81) {
      $("#popular").append("<p>Your music taste is almost 'in'! Your music is halfway above ground!</p>");
    }else if (popular > 80) {
      $("#popular").append("<p>Your music taste is totally 'in'! Your music is above ground, mainstream!</p>");
    }

    //calls drawchart method to draw a chart based on popularity of song
    drawChart(popular);

    //Resets the field for a new search
    $('#search').val("");
  }

  //Draw chart
  function drawChart(popularity) {
    //Sets array for chart components
    var popData = google.visualization.arrayToDataTable([
         ['Popularity', popularity],
    ], true);

    //Sets attributes for how chart will look
    var options = {
        width: 500, height: 220,
        redFrom: 80, redTo: 100,
        yellowFrom: 50, yellowTo:80,
        minorTicks: 5
    };

    //Creates the new chart based on set attributes
    var chart = new google.visualization.Gauge(document.getElementById('chart_div'));
    chart.draw(popData, options);
  }

}) 


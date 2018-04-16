import angular from 'angular'

// this example comes from https://docs.angularjs.org/guide/filter
angular
  .module('myReverseFilterApp', [])
  .filter('reverse', function () {
    return function (input, uppercase) {
      input = input || ''
      var out = ''
      for (var i = 0; i < input.length; i++) {
        out = input.charAt(i) + out
      }
      // conditional based on optional argument
      if (uppercase) {
        out = out.toUpperCase()
      }
      return out
    }
  })
  .controller('MyController', [
    '$scope',
    'reverseFilter',
    function ($scope, reverseFilter) {
      $scope.greeting = 'hello'
      $scope.filteredGreeting = reverseFilter($scope.greeting)
    }
  ])

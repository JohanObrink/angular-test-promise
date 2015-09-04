(function () {
  angular
    .module('test-app')
    .factory('repo', repo);

  repo.$injects = [
    '$http'
  ];

  function repo($http) {
    var service = {
      getCommits: getCommits
    };

    return service;

    ////////////

    function getCommits() {
      return $http
        .get('https://api.github.com/repos/JohanObrink/angular-test-promise/commits')
        .then(function (response) {
          return response.data;
        });
    }
  }
})();

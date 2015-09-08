(function () {
  angular
    .module('test-app')
    .controller('Main', Main);

  Main.$inject = [
    'repo'
  ];

  function Main(repo) {
    var vm = this;
    
    vm.commits = [];
    vm.pulls = [];
    vm.isLoading = false;
    vm.error = null;

    vm.getCommits = getCommits;
    vm.getPulls = getPulls;

    function activate() {
      getCommits();
    }

    function getCommits() {
      vm.isLoading = true;
      vm.error = null;

      repo
        .getCommits()
        .then(function (commits) {
          vm.commits = commits;
        })
        .catch(function (error) {
          vm.error = error;
        })
        .finally(function () {
          vm.isLoading = false;
        });
    }

    function getPulls() {
      vm.isLoading = true;
      vm.error = null;

      repo
        .getPulls()
        .then(function (pulls) {
          vm.pulls = pulls;
        })
        .catch(function (error) {
          vm.error = error;
        })
        .finally(function () {
          vm.isLoading = false;
        });
    }

    activate();
  }
})();

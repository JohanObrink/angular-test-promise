describe('Main controller', function () {
  var vm, repo, $rootScope, $scope;
  beforeEach(module('test-app'));
  beforeEach(inject(function ($injector) {
    $rootScope = $injector.get('$rootScope');
    $scope = $rootScope.$new();

    repo = {
      getCommits: jasmine.createPromise('repo.getCommits')
    };

    $controller = $injector.get('$controller');
    vm = $controller('Main', {
      '$scope': $scope,
      'repo': repo
    });
  }));
  it('gets commits on activate', function () {
    expect(repo.getCommits).toHaveBeenCalled();
  });
  it('sets isLoading to true when getting commits', function () {
    expect(vm.isLoading).toBe(true);
  });
  it('sets the commits on vm.commits on success', function () {
    var commits = [{}, {}, {}];
    repo.getCommits.resolve(commits);

    expect(vm.commits).toEqual(commits);
  });
  it('sets isLoading to false on success', function () {
    var commits = [{}, {}, {}];
    repo.getCommits.resolve(commits);

    expect(vm.isLoading).toBe(false);
  });
  it('puts error on vm.error on fail', function () {
    repo.getCommits.reject('b0rk');

    expect(vm.error).toEqual('b0rk');
  });
  it('sets isLoading to false on fail', function () {
    repo.getCommits.reject('b0rk');

    expect(vm.isLoading).toBe(false);
  });
  it('resets error on getCommits', function () {
    repo.getCommits.reject('b0rk');
    vm.getCommits();

    expect(vm.error).toEqual(null);
  });
});
describe('Main controller', function () {
  var vm, repo, $rootScope, $scope;
  beforeEach(module('test-app'));
  beforeEach(inject(function ($injector) {
    $rootScope = $injector.get('$rootScope');
    $scope = $rootScope.$new();

    repo = {
      getCommits: sinon.promise(),
      getPulls: sinon.promise()
    };

    var $controller = $injector.get('$controller');
    vm = $controller('Main', {
      '$scope': $scope,
      'repo': repo
    });
  }));
  it('gets commits on activate', function () {
    expect(repo.getCommits).calledOnce;
  });
  it('sets isLoading to true when getting commits', function () {
    expect(vm.isLoading).to.be.true;
  });
  it('sets puts the commits on vm.commits on success', function () {
    var commits = [{}, {}, {}];
    repo.getCommits.resolve(commits);
    $rootScope.$digest();

    expect(vm.commits).to.eql(commits);
  });
  it('sets isLoading to false on success', function () {
    var commits = [{}, {}, {}];
    repo.getCommits.resolve(commits);
    $rootScope.$digest();

    expect(vm.isLoading).to.be.false;
  });
  it('puts error on vm.error on fail', function () {
    repo.getCommits.reject('b0rk');
    $rootScope.$digest();

    expect(vm.error).to.equal('b0rk');
  });
  it('sets isLoading to false on fail', function () {
    repo.getCommits.reject('b0rk');
    $rootScope.$digest();

    expect(vm.isLoading).to.be.false;
  });
  it('resets error on getCommits', function () {
    repo.getCommits.reject('b0rk');
    $rootScope.$digest();
    vm.getCommits();

    expect(vm.error).to.not.exist;
  });
  it('can resolve immediately', function () {
    repo.getPulls.resolves([{}]);

    vm.getPulls();

    expect(vm.pulls).to.eql([{}]);
  });
  it('can reject immediately', function () {
    repo.getPulls.rejects('pull b0rk');

    vm.getPulls();

    expect(vm.error).to.equal('pull b0rk');
  });
});
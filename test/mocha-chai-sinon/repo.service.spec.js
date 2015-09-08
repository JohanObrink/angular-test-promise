describe('repo service', function () {
  var $http, repo;
  beforeEach(module('test-app', function ($provide) {
    $http = {
      get: sinon.promise()
    };
    $provide.value('$http', $http);
  }));
  beforeEach(inject(function ($injector) {
    repo = $injector.get('repo');
  }));
  describe('#getCommits', function () {
    var success, fail, done;
    beforeEach(function () {
      success = sinon.spy();
      fail = sinon.spy();
      done = sinon.spy();

      repo.getCommits().then(success).catch(fail).finally(done);
    });
    it('gets the correct url', function () {
      expect($http.get)
        .calledOnce
        .calledWith('https://api.github.com/repos/JohanObrink/angular-test-promise/commits');
    });
    it('returns the data property of the response', function () {
      $http.get.resolve({data: {foo: 'bar'}});

      expect(success).calledOnce.calledWith({foo: 'bar'});
      expect(fail).not.called;
      expect(done).calledOnce;
    });
    it('propagates errors', function () {
      $http.get.reject('b0rk');

      expect(success).not.called;
      expect(fail).calledOnce.calledWith('b0rk');
      expect(done).calledOnce;
    });
  });
});
describe('repo service', function () {
  var $http, repo;
  beforeEach(module('test-app', function ($provide) {
    $http = {
      get: jasmine.createPromise('$http.get')
    };
    $provide.value('$http', $http);
  }));
  beforeEach(inject(function ($injector) {
    repo = $injector.get('repo');
  }));
  describe('#getCommits', function () {
    var success, fail, done, notify;
    beforeEach(function () {
      success = jasmine.createSpy('success');
      fail = jasmine.createSpy('fail');
      done = jasmine.createSpy('done');
      notify = jasmine.createSpy('notify');

      repo.getCommits().then(success).catch(fail).finally(done, notify);
    });
    it('gets the correct url', function () {
      expect($http.get)
        .toHaveBeenCalledWith('https://api.github.com/repos/JohanObrink/angular-test-promise/commits');
    });
    it('returns the data property of the response', function () {
      $http.get.resolve({data: {foo: 'bar'}});

      expect(success).toHaveBeenCalledWith({foo: 'bar'});
      expect(fail).not.toHaveBeenCalled();
      expect(done).toHaveBeenCalled();
    });
    it('propagates errors', function () {
      $http.get.reject('b0rk');

      expect(success).not.toHaveBeenCalled();
      expect(fail).toHaveBeenCalledWith('b0rk');
      expect(done).toHaveBeenCalled();
    });
    it('propagates notifications', function () {
      $http.get.notify('hello');

      expect(success).not.toHaveBeenCalled();
      expect(fail).not.toHaveBeenCalled();
      expect(notify).toHaveBeenCalledWith('hello');
      expect(done).not.toHaveBeenCalled();
    });
  });
});
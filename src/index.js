(function () {

  var $injector, $q, $rootScope;
  function inject() {
    $injector = angular.injector(['ngMock']);
    $q = $injector.get('$q');
    $rootScope = $injector.get('$rootScope');
  }

  if(window.jasmine) {
    window.jasmine.createPromise = function () {
      inject();
      var deferred = $q.defer();
      var spy = jasmine
        .createSpy
        .apply(jasmine, arguments);

      spy.resolve = function () {
        deferred.resolve.apply(deferred, arguments);
        $rootScope.$digest();
      }

      spy.reject = function () {
        deferred.reject.apply(deferred, arguments);
        $rootScope.$digest();
      }

      if('function' === typeof spy.andReturn) {
        spy = spy.andReturn(deferred.promise);
      } else {
        spy = spy.and.returnValue(deferred.promise);
      }

      return spy;
    };
  }
  if(window.sinon) {
    window.sinon.promise = function () {
      inject();
      var deferred = $q.defer();
      var spy = sinon
        .stub
        .apply(sinon, arguments)
        .returns(deferred.promise);

      spy.resolve = function () {
        deferred.resolve.apply(deferred, arguments);
        $rootScope.$digest();
      }

      spy.reject = function () {
        deferred.reject.apply(deferred, arguments);
        $rootScope.$digest();
      }

      return spy;
    };
  }
})();
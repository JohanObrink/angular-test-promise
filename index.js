(function () {

  var $injector, $q, $rootScope, initialized;
  function inject() {
    if(initialized) { return; }

    $injector = angular.injector(['ngMock']);
    $q = $injector.get('$q');
    $rootScope = $injector.get('$rootScope');

    initialized = true;
  }

  function digest() {
    try { $rootScope.$digest(); }
    catch(err) { /* that's ok */ }
  }

  function createPromise(createSpy) {
    return function () {
      inject();
      var autoFlush = false;
      var deferred = $q.defer();

      function autoFlushPromise(promise) {
        var _then, _catch, _finally;
        _then = promise.then;
        _catch = promise.catch;
        _finally = promise.finally;

        promise.then = function () {
          var p = _then.apply(promise, arguments);
          if(autoFlush) { digest(); }
          return autoFlushPromise(p);
        };
        promise.catch = function () {
          var p = _catch.apply(promise, arguments);
          if(autoFlush) { digest(); }
          return autoFlushPromise(p);
        };
        promise.finally = function () {
          var p = _finally.apply(promise, arguments);
          if(autoFlush) { digest(); }
          return autoFlushPromise(p);
        };
        return promise;
      }

      var promise = autoFlushPromise(deferred.promise);

      var spy = createSpy.apply(null, arguments);

      spy.resolve = function () {
        deferred.resolve.apply(deferred, arguments);
        digest();
        return spy;
      };
      spy.resolves = function () {
        deferred.resolve.apply(deferred, arguments);
        autoFlush = true;
        return spy;
      };
      spy.andResolve = spy.resolves;

      spy.reject = function () {
        deferred.reject.apply(deferred, arguments);
        digest();
        return spy;
      };
      spy.rejects = function () {
        deferred.reject.apply(deferred, arguments);
        autoFlush = true;
        return spy;
      };
      spy.andReject = spy.rejects;

      spy.notify = function () {
        deferred.notify.apply(deferred, arguments);
        digest();
        return spy;
      };
      spy.notifies = function () {
        deferred.notify.apply(deferred, arguments);
        autoFlush = true;
        return spy;
      };
      spy.andNotify = spy.notifies;

      if('function' === typeof spy.andReturn) {
        spy = spy.andReturn(promise);
      } else if(spy.and && 'function' === typeof spy.and.returnValue) {
        spy = spy.and.returnValue(promise);
      } else if('function' === typeof spy.returns) {
        spy = spy.returns(promise);
      }

      return spy;
    };
  }

  if(window.jasmine) {
    window.jasmine.createPromise = createPromise(jasmine.createSpy);
  }

  if(window.sinon) {
    window.sinon.promise = createPromise(sinon.stub);
  }
})();
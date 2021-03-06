# angular-test-promise
Adds $q promise capability to jasmine, jasmine2 and sinon

## Installing

Just run ```bower install angular-test-promise```. This package will work with jasmine (1.x and 2.x) with or without sinon,
as well as mocha using sinon.  For this purpose, no runtime dependencies are specified. This means you will have to install
your mocker of choice yourself.

## Using

Make sure ```angular-test-promise``` is included after your selected mocking framework. New methods will be added:

### Using sinon with sinon-chai

```javascript
var service = {
  loadStuff: sinon.promise()
};

// your promise can be queried lika a spy/stub
expect(service.loadStuff).calledOnce;

// to resolve the promise, call it like this
service.loadStuff.resolve([]); // automatically calls $rootScope.$digest() to force promise to resolve

// to reject the promise, call it like this
service.loadStuff.reject('Some error occured'); // automatically calls $rootScope.$digest() to force promise to resolve

// to notify on the promise, call it like this
service.loadStuff.notify('Some progress message'); // automatically calls $rootScope.$digest() to force promise to resolve

// You can also create an auto resolving or rejecting promise
var anotherService = {
  successfulCall: sinon.promise().resolves('yay!'), // will immediately call then
  failedCall: sinon.promise().rejects('doh!')     // will immediately call catch
};
```

### Using jasmine / jasmine 2 without sinon

```javascript
var service = {
  loadStuff: jasmine.createPromise('service.loadStuff')
};

// your promise can be queried lika a spy
expect(service.loadStuff).toHaveBeenCalled();

// to resolve the promise, call it like this
service.loadStuff.resolve([]); // automatically calls $rootScope.$digest() to force promise to resolve

// to reject the promise, call it like this
service.loadStuff.reject('Some error occured'); // automatically calls $rootScope.$digest() to force promise to resolve

// to notify on the promise, call it like this
service.loadStuff.notify('Some progress message'); // automatically calls $rootScope.$digest() to force promise to resolve

// You can also create an auto resolving or rejecting promise
var anotherService = {
  successfulCall: jasmine.createPromise('anotherService.successfulCall').andResolve('yay!'),  // will immediately call then
  failedCall: jasmine.createPromise('anotherService.failedCall').andReject('doh!')            // will immediately call catch
};
```

### Using jasmine / jasmine 2 with sinon

```javascript
var service = {
  loadStuff: sinon.promise()
};

// your promise can be queried lika a spy
expect(service.loadStuff).toHaveBeenCalled();

// to resolve the promise, call it like this
service.loadStuff.resolve([]); // automatically calls $rootScope.$digest() to force promise to resolve

// to reject the promise, call it like this
service.loadStuff.reject('Some error occured'); // automatically calls $rootScope.$digest() to force promise to resolve

// to notify on the promise, call it like this
service.loadStuff.notify('Some progress message'); // automatically calls $rootScope.$digest() to force promise to resolve

// You can also create an auto resolving or rejecting promise
var anotherService = {
  successfulCall: sinon.promise().resolves('yay!'), // will immediately call then
  failedCall: sinon.promise().rejects('doh!')       // will immediately call catch
};
```

## Testing

Clone the repo

```git clone git@github.com:JohanObrink/angular-test-promise.git```

Open ```test/index.html``` in your browser. Refresh after code change.

The plan is to get the tests running headless in a console with autorefresh etc. but I'm not there yet.

## Licence

The MIT License (MIT)

Copyright (c) 2015 Johan Öbrink

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

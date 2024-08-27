import { expect } from 'chai';
import sinon from 'sinon';
import HTTP, { METHOD } from './http.ts';

describe('HTTP class', function () {
  let http: HTTP;
  let xhr: sinon.SinonFakeXMLHttpRequestStatic;
  let requests: sinon.SinonFakeXMLHttpRequest[];
  let originalXMLHttpRequest: typeof XMLHttpRequest;
  let requestSpy: sinon.SinonSpy;
  let openSpy: sinon.SinonSpy;

  beforeEach(function () {
    requests = [];
    xhr = sinon.useFakeXMLHttpRequest();

    xhr.onCreate = function (req) {
      requests.push(req);
    };

    http = new HTTP('test');

    originalXMLHttpRequest = global.XMLHttpRequest;
    global.XMLHttpRequest = xhr as unknown as {
      new (): XMLHttpRequest;
      prototype: XMLHttpRequest;
      readonly UNSENT: 0;
      readonly OPENED: 1;
      readonly HEADERS_RECEIVED: 2;
      readonly LOADING: 3;
      readonly DONE: 4;
    };

    requestSpy = sinon.spy(http, 'request');
    openSpy = sinon.spy(XMLHttpRequest.prototype, 'open');

    (http as any).getBaseUrl = function (): string {
      return this.baseUrl;
    };
  });

  afterEach(function () {
    sinon.restore();
    global.XMLHttpRequest = originalXMLHttpRequest;
  });

  describe('constructor', function () {
    it('should set baseUrl correctly', function () {
      expect((http as any).getBaseUrl()).to.equal('https://ya-praktikum.tech/api/v2/test');
    });
  });

  describe('get method', function () {
    it('should call request with GET method', function () {
      http.get('/endpoint');
      expect(requestSpy.calledOnceWith('/endpoint', sinon.match({ method: METHOD.GET }))).to.be.true;
    });
  });

  describe('post method', function () {
    it('should call request with POST method', function () {
      http.post('/endpoint');
      expect(requestSpy.calledOnceWith('/endpoint', sinon.match({ method: METHOD.POST }))).to.be.true;
    });
  });

  describe('put method', function () {
    it('should call request with PUT method', function () {
      http.put('/endpoint');
      expect(requestSpy.calledOnceWith('/endpoint', sinon.match({ method: METHOD.PUT }))).to.be.true;
    });
  });

  describe('patch method', function () {
    it('should call request with PATCH method', function () {
      http.patch('/endpoint');
      expect(requestSpy.calledOnceWith('/endpoint', sinon.match({ method: METHOD.PATCH }))).to.be.true;
    });
  });

  describe('delete method', function () {
    it('should call request with DELETE method', function () {
      http.delete('/endpoint');
      expect(requestSpy.calledOnceWith('/endpoint', sinon.match({ method: METHOD.DELETE }))).to.be.true;
    });
  });

  describe('request method', function () {
    it('should send a request with correct method', function () {
      http.request('/endpoint', { method: METHOD.POST });
      expect(requestSpy.calledOnceWith('/endpoint', sinon.match({ method: METHOD.POST }))).to.be.true;
    });

    it('should call request once', function () {
      http.request('/endpoint', { method: METHOD.POST });

      expect(requestSpy.calledOnce).to.be.true;
    });

    it('should call request with the correct URL', function () {
      http.request('/endpoint', { method: METHOD.POST });

      expect(requestSpy.firstCall.args[0]).to.equal('/endpoint');
    });

    it('should call request with the correct HTTP method', function () {
      http.request('/endpoint', { method: METHOD.POST });

      expect(requestSpy.firstCall.args[1]?.method).to.equal(METHOD.POST);
    });

    it('should call open once', function () {
      http.request('/endpoint', { method: METHOD.POST });

      expect(openSpy.calledOnce).to.be.true;
    });

    it('should call open with the correct URL as the second argument', function () {
      http.request('/endpoint', { method: METHOD.POST });
      const expectedUrl = 'https://ya-praktikum.tech/api/v2/test/endpoint';

      expect(openSpy.firstCall.args[1]).to.equal(expectedUrl);
    });

    it('should send a request when the method is not GET and data is provided', function () {
      const data = JSON.stringify({ key: 'value' });

      http.request('/endpoint', { method: METHOD.POST, data });

      expect(requests).to.have.lengthOf(1);
    });

    it('should send the correct data in the request body when data is provided', function () {
      const data = JSON.stringify({ key: 'value' });

      http.request('/endpoint', { method: METHOD.POST, data });

      expect(requests[0].requestBody).to.equal(data);
    });

    it('should set Content-Type header if type is provided', function () {
      const type = 'application/xml';

      http.request('/endpoint', { method: METHOD.POST, data: '<xml></xml>', type });

      expect(requests[0].requestHeaders['Content-Type']).to.includes(type);
    });

    it('should set Content-Type header to application/json by default', function () {
      http.request('/endpoint', { method: METHOD.POST, data: JSON.stringify({ key: 'value' }) });

      expect(requests[0].requestHeaders['Content-Type']).to.includes('application/json');
    });

    it('should resolve with XMLHttpRequest instance on load', function (done) {
      http.request('/endpoint', { method: METHOD.GET }).then((response) => {
        expect(response).to.be.an.instanceof(XMLHttpRequest);
        done();
      });
      requests[0].respond(200, { 'Content-Type': 'application/json' }, '{}');
    });
  });
});

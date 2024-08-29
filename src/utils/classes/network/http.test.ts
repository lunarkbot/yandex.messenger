import { expect } from 'chai';
import sinon from 'sinon';
import HTTP, { METHOD } from './http.ts';

describe('HTTP class', () => {
  let http: HTTP;
  let xhr: sinon.SinonFakeXMLHttpRequestStatic;
  let requests: sinon.SinonFakeXMLHttpRequest[];
  let originalXMLHttpRequest: typeof XMLHttpRequest;
  let requestSpy: sinon.SinonSpy;
  let openSpy: sinon.SinonSpy;

  beforeEach(() => {
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

  afterEach(() => {
    sinon.restore();
    global.XMLHttpRequest = originalXMLHttpRequest;
  });

  describe('constructor', () => {
    it('should set baseUrl correctly', () => {
      expect((http as any).getBaseUrl()).to.equal('https://ya-praktikum.tech/api/v2/test');
    });
  });

  describe('get method', () => {
    it('should call request with GET method', () => {
      http.get('/endpoint');
      expect(requestSpy.calledOnceWith('/endpoint', sinon.match({ method: METHOD.GET }))).to.be.true;
    });
  });

  describe('post method', () => {
    it('should call request with POST method', () => {
      http.post('/endpoint');
      expect(requestSpy.calledOnceWith('/endpoint', sinon.match({ method: METHOD.POST }))).to.be.true;
    });
  });

  describe('put method', () => {
    it('should call request with PUT method', () => {
      http.put('/endpoint');
      expect(requestSpy.calledOnceWith('/endpoint', sinon.match({ method: METHOD.PUT }))).to.be.true;
    });
  });

  describe('patch method', () => {
    it('should call request with PATCH method', () => {
      http.patch('/endpoint');
      expect(requestSpy.calledOnceWith('/endpoint', sinon.match({ method: METHOD.PATCH }))).to.be.true;
    });
  });

  describe('delete method', () => {
    it('should call request with DELETE method', () => {
      http.delete('/endpoint');
      expect(requestSpy.calledOnceWith('/endpoint', sinon.match({ method: METHOD.DELETE }))).to.be.true;
    });
  });

  describe('request method', () => {
    it('should send a request with correct method', () => {
      http.request('/endpoint', { method: METHOD.POST });
      expect(requestSpy.calledOnceWith('/endpoint', sinon.match({ method: METHOD.POST }))).to.be.true;
    });

    it('should call request once', () => {
      http.request('/endpoint', { method: METHOD.POST });

      expect(requestSpy.calledOnce).to.be.true;
    });

    it('should call request with the correct URL', () => {
      http.request('/endpoint', { method: METHOD.POST });

      expect(requestSpy.firstCall.args[0]).to.equal('/endpoint');
    });

    it('should call request with the correct HTTP method', () => {
      http.request('/endpoint', { method: METHOD.POST });

      expect(requestSpy.firstCall.args[1]?.method).to.equal(METHOD.POST);
    });

    it('should call open once', () => {
      http.request('/endpoint', { method: METHOD.POST });

      expect(openSpy.calledOnce).to.be.true;
    });

    it('should call open with the correct URL as the second argument', () => {
      http.request('/endpoint', { method: METHOD.POST });
      const expectedUrl = 'https://ya-praktikum.tech/api/v2/test/endpoint';

      expect(openSpy.firstCall.args[1]).to.equal(expectedUrl);
    });

    it('should send a request when the method is not GET and data is provided', () => {
      const data = JSON.stringify({ key: 'value' });

      http.request('/endpoint', { method: METHOD.POST, data });

      expect(requests).to.have.lengthOf(1);
    });

    it('should send the correct data in the request body when data is provided', () => {
      const data = JSON.stringify({ key: 'value' });

      http.request('/endpoint', { method: METHOD.POST, data });

      expect(requests[0].requestBody).to.equal(data);
    });

    it('should set Content-Type header if type is provided', () => {
      const type = 'application/xml';

      http.request('/endpoint', { method: METHOD.POST, data: '<xml></xml>', type });

      expect(requests[0].requestHeaders['Content-Type']).to.includes(type);
    });

    it('should set Content-Type header to application/json by default', () => {
      http.request('/endpoint', { method: METHOD.POST, data: JSON.stringify({ key: 'value' }) });

      expect(requests[0].requestHeaders['Content-Type']).to.includes('application/json');
    });

    it('should resolve with XMLHttpRequest instance on load', (done) => {
      http.request('/endpoint', { method: METHOD.GET }).then((response) => {
        expect(response).to.be.an.instanceof(XMLHttpRequest);
        done();
      });
      requests[0].respond(200, { 'Content-Type': 'application/json' }, '{}');
    });
  });
});

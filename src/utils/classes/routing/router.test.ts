import { expect } from 'chai';
import sinon from 'sinon';
import jsdomGlobal from 'jsdom-global';
import Router from './router.ts';
import Route from './route.ts';

jsdomGlobal(undefined, { url: 'http://localhost' });

describe('Router', () => {
  let router: Router;

  beforeEach(() => {
    const base = document.createElement('base');
    base.href = 'http://localhost';
    document.head.appendChild(base);

    sinon.stub(window.history, 'replaceState');

    router = new Router('#app');
    router['routes'] = [];
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should be a singleton', () => {
    const anotherRouter = new Router('#app');
    expect(router).to.equal(anotherRouter);
  });

  it('use() should add a route', () => {
    router.use('/test', sinon.stub());
    expect(router['routes'][0]).to.instanceof(Route);
  });

  it('should set onpopstate handler when start is called', () => {
    const onpopstateSpy = sinon.stub();
    sinon.stub(window, 'onpopstate').set(onpopstateSpy);

    router.use('/404', sinon.stub()).start();

    expect(onpopstateSpy.called).to.be.true;
  });

  it('should initialize routing by calling _onRoute with the current pathname', () => {
    const onRouteSpy = sinon.spy(router as any, '_onRoute');
    router.use('/404', sinon.stub()).start();

    expect(onRouteSpy.calledWith(window.location.pathname)).to.be.true;
  });

  it('go() should change the route', () => {
    const pushStateSpy = sinon.spy(window.history, 'pushState');
    const onRouteSpy = sinon.spy(router as any, '_onRoute');

    router.go('/test');

    expect(pushStateSpy.calledWith({}, '', '/test')).to.be.true;
    expect(onRouteSpy.calledWith('/test')).to.be.true;
  });

  it('back() should call history.back()', () => {
    const backSpy = sinon.spy(window.history, 'back');

    router.back();

    expect(backSpy.called).to.be.true;
  });

  it('forward() should call history.forward()', () => {
    const forwardSpy = sinon.spy(window.history, 'forward');

    router.forward();

    expect(forwardSpy.called).to.be.true;
  });

  it('getRoute() should return the correct route', () => {
    const stub = sinon.stub();

    const route = new Route('/test', stub, { rootQuery: '#app' });

    router.use('/test', stub);

    const result = router.getRoute('/test');

    expect(result).to.deep.equal(route);
  });
});

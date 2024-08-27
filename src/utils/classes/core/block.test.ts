import { expect } from 'chai';
import sinon from 'sinon';
import Block from './block.ts';
import EventBus from '../events/eventBus.ts';

class TestBlock extends Block<any> {
  public render(): string {
    return '<div>ConcreteBlock</div>';
  }
}

describe('Block', () => {
  let block: Block<any>;
  let emitSpy: sinon.SinonSpy;
  let onSpy: sinon.SinonSpy;

  beforeEach(() => {
    emitSpy = sinon.spy(EventBus.prototype, 'emit');
    onSpy = sinon.spy(EventBus.prototype, 'on');

    const props = { testProp: 'test' };
    const options = {
      tagName: 'div',
      props,
      events: { click: sinon.spy() },
    };

    block = new TestBlock(options);
  });

  afterEach(() => {
    sinon.restore();
    emitSpy.restore();
    onSpy.restore();
  });

  it('should initialize with given properties', () => {
    expect(block.props.testProp).to.equal('test');
  });

  it('should create an element with the correct tagName', () => {
    const element = block.getContent();
    expect(element.tagName.toLowerCase()).to.equal('div');
  });

  it('should set props correctly', () => {
    block.setProps({ newProp: 'newValue' });
    expect(block.props.newProp).to.equal('newValue');
  });

  it('should register INIT event', () => {
    expect(onSpy.calledWith(Block.EVENTS.INIT, sinon.match.func)).to.be.true;
  });

  it('should register FLOW_CDM event', () => {
    expect(onSpy.calledWith(Block.EVENTS.FLOW_CDM, sinon.match.func)).to.be.true;
  });

  it('should register FLOW_RENDER event', () => {
    expect(onSpy.calledWith(Block.EVENTS.FLOW_RENDER, sinon.match.func)).to.be.true;
  });

  it('should register FLOW_CDU event', () => {
    expect(onSpy.calledWith(Block.EVENTS.FLOW_CDU, sinon.match.func)).to.be.true;
  });

  it('should update props and emit FLOW_CDU event', () => {
    block.setProps({ newProp: 'newValue' });
    expect(block.props.newProp).to.equal('newValue');
    expect(emitSpy.calledWith(Block.EVENTS.FLOW_CDU)).to.be.true;
  });

  it('should render HTML content correctly', () => {
    sinon.stub(block, 'render').returns('<div>Test</div>');
    block.init();
    expect(block.element!.innerHTML).to.equal('<div>Test</div>');
  });

  it('should show content', () => {
    block.init();
    block.show();
    expect(block.element!.classList.contains('hidden')).to.be.false;
  });

  it('should hide content', () => {
    block.init();
    block.hide();
    expect(block.element!.classList.contains('hidden')).to.be.true;
  });
});

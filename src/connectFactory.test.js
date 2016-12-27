import React, { Component, PropTypes } from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import connectFactory from './connectFactory';

const { node } = PropTypes;

class MockWrapper extends Component {
  static propTypes = {
    children: node,
  }
  render() {
    return (
      <div id="mockWrapper">
        {this.props.children}
      </div>
    );
  }
}

class MockComponent extends Component { // eslint-disable-line react/no-multi-comp
  static propTypes = {
    children: node,
  }
  render() {
    return (
      <div id="mockComponent">
        {this.props.children}
      </div>
    );
  }
}

const mapPropsToOptions = ({ user }) => {
  return {
    href: user.href,
  };
};

describe('connectFactory', () => {
  it('returns a function', () => {
    expect(connectFactory(MockWrapper)).to.be.a.function;
  });

  it('returns a function that returns a component', () => {
    expect(connectFactory(MockWrapper)()).to.be.a.function;
  });

  it('returns a function that returns a component that uses the options given to it', () => {
    expect(connectFactory(MockWrapper)(mapPropsToOptions)(MockComponent)).to.be.a.function;
  });

  it('creates a component that uses the href in the options', () => {
    const Connected = connectFactory(MockWrapper)({ href: '/user/123' })(MockComponent);
    const wrapper = mount(
      <Connected />
    );

    expect(wrapper.find('#mockWrapper').length).to.be.equal(1);
    expect(wrapper.find('#mockComponent').length).to.be.equal(1);
    expect(wrapper.find('MockWrapper').props()).to.contain({
      href: '/user/123',
    });
  });

  it('creates a component that uses the calculated href in the options', () => {
    const Connected = connectFactory(MockWrapper)(mapPropsToOptions)(MockComponent);
    const wrapper = mount(
      <Connected user={{ href: '/user/123' }} />
    );

    expect(wrapper.find('#mockWrapper').length).to.be.equal(1);
    expect(wrapper.find('#mockComponent').length).to.be.equal(1);
    expect(wrapper.find('MockWrapper').props()).to.contain({
      href: '/user/123',
    });
  });

  it('creates a component that passes through props to the options', () => {
    const Connected = connectFactory(MockWrapper)()(MockComponent);
    const wrapper = mount(
      <Connected href="/user/123" />
    );

    expect(wrapper.find('#mockWrapper').length).to.be.equal(1);
    expect(wrapper.find('#mockComponent').length).to.be.equal(1);
    expect(wrapper.find('MockWrapper').props()).to.contain({
      href: '/user/123',
    });
  });
});

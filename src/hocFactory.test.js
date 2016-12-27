import React, { Component } from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import hocFactory from './hocFactory';

class Mock extends Component {
  render() {
    return (
      <div {...this.props} />
    );
  }
}

describe('hocFactory', () => {
  it('returns a component function', () => {
    expect(hocFactory({ href: '/user/123' })).to.be.a.function;
  });

  it('returns a function that returns a function', () => {
    expect(hocFactory({ href: '/user/123' })(Mock)).to.be.a.function;
  });

  it('uses the options and props given to it', () => {
    const HOC = hocFactory({ id: '123' })(Mock);

    const wrapper = mount(
      <HOC title="test" />
    );

    expect(wrapper.find('div').props()).to.contain({
      id: '123',
    });

    expect(wrapper.find('div').props()).to.contain({
      title: 'test',
    });
  });
});

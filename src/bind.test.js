import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

import bind from './bind';
import hocFactory from './hocFactory';

describe('bind', () => {
  const Mock = (props) => <div {...props} />;

  const connect1 = hocFactory({ title: '1' });
  const connect2 = hocFactory({ title: '2' });

  it('binds a higher order component', () => {
    const Bound = bind(
      connect1
    )(Mock);

    const wrapper = mount(<Bound />);

    expect(wrapper.find('div').props()).to.be.deep.equal({ title: '1' });
  });

  it('binds higher order components in the correct order', () => {
    const Bound = bind(
      connect1,
      connect2
    )(Mock);

    const wrapper = mount(<Bound />);

    // WHY 1?
    // Because inner hocs should override the values from outer hocs
    expect(wrapper.find('div').props()).to.be.deep.equal({ title: '1' });
  });

  it('passes through the component when no connect statements are given', () => {
    const Bound = bind()(Mock);
    const wrapper = mount(<Bound />);

    expect(wrapper.find('div').props()).to.be.deep.equal({});
  });
});

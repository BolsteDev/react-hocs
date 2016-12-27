import React from 'react';

export default (options) =>
  (Component) => {
    const component = (props) => {
      return (
        <Component {...options} {...props} />
      );
    };

    const componentName = Component.displayName || Component.name ||
      (Component.constuctor ? Component.constructor.name : '') || '';

    Object.defineProperty(component, 'name', {
      value: `HOC(${componentName})`,
      writable: false,
    });

    return component;
  };

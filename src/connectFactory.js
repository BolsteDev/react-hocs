import React from 'react';

/**
 * This will turn your component into a HoC that
 * is of the form:
 *
 * ```
 * function(WrapperComponent) :-> [returned] function(options) :-> function(props) :-> Component
 * ```
 *
 * Usage:
 *
 * ```js
 * import hocFactory from 'react-hocs/hocFactory';
 * import MyComponent from '../components/MyComponent';
 * export default hocFactory(MyComponent);
 * ```
 *
 * @param {Component} WrapperComponent - The component you wish to turn into a HoC
 * @return {function} - Returns function(options) :-> function(Component) :-> Component
 */
export default (WrapperComponent) => {
  /**
   * Options can be a callback that takes the wrappers params,
   * or normal options
   */
  return (options) => {
    return (Component) => {
      const anonymousFunction = function Connect(props) {
        let opts = options;

        if (typeof options === 'undefined') {
          opts = props;
        }

        if (typeof options === 'function') {
          opts = options(props);
        }

        return (
          <WrapperComponent {...opts}>
            <Component {...props} />
          </WrapperComponent>
        );
      };

      // Make the anonymous function we are returning have a helpful name
      // so that when it is rendered in the React Webkit plugin, it is a lot
      // easier to debug.
      const componentName = WrapperComponent.displayName || WrapperComponent.name ||
        (WrapperComponent.constuctor ? WrapperComponent.constructor.name : '') || '';

      Object.defineProperty(anonymousFunction, 'name', {
        value: `Connect(${componentName})`,
        writable: false,
      });

      return anonymousFunction;
    };
  };
};

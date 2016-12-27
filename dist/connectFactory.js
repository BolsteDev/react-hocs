'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
exports.default = function (WrapperComponent) {
  /**
   * Options can be a callback that takes the wrappers params,
   * or normal options
   */
  return function (options) {
    return function (Component) {
      var anonymousFunction = function Connect(props) {
        var opts = options;

        if (typeof options === 'undefined') {
          opts = props;
        }

        if (typeof options === 'function') {
          opts = options(props);
        }

        return _react2.default.createElement(
          WrapperComponent,
          opts,
          _react2.default.createElement(Component, props)
        );
      };

      // Make the anonymous function we are returning have a helpful name
      // so that when it is rendered in the React Webkit plugin, it is a lot
      // easier to debug.
      var componentName = WrapperComponent.displayName || WrapperComponent.name || (WrapperComponent.constuctor ? WrapperComponent.constructor.name : '') || '';

      Object.defineProperty(anonymousFunction, 'name', {
        value: 'Connect(' + componentName + ')',
        writable: false
      });

      return anonymousFunction;
    };
  };
};
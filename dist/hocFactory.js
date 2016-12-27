'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (options) {
  return function (Component) {
    var component = function component(props) {
      return _react2.default.createElement(Component, _extends({}, options, props));
    };

    var componentName = Component.displayName || Component.name || (Component.constuctor ? Component.constructor.name : '') || '';

    Object.defineProperty(component, 'name', {
      value: 'HOC(' + componentName + ')',
      writable: false
    });

    return component;
  };
};
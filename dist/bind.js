'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Use a flat structure to bind many connect statements to a component
 * instead of nesting them in a deep callback structure
 *
 * @param {function} hocs - any number of higher order functions that take a component and return a component
 * @return function – A function that takes a component and returns a Component
 */
exports.default = function () {
  for (var _len = arguments.length, hocs = Array(_len), _key = 0; _key < _len; _key++) {
    hocs[_key] = arguments[_key];
  }

  return function (Component) {
    var C = Component;

    hocs.reverse().forEach(function (hoc) {
      C = hoc(C);
    });

    return C;
  };
};
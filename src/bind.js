/**
 * Use a flat structure to bind many connect statements to a component
 * instead of nesting them in a deep callback structure
 *
 * @param {function} hocs - any number of higher order functions that take a component and return a component
 * @return function – A function that takes a component and returns a Component
 */
export default (...hocs) => {
  return (Component) => {
    let C = Component;

    hocs.reverse().forEach(hoc => {
      C = hoc(C);
    });

    return C;
  };
};

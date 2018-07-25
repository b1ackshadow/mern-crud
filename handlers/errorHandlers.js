const handleError = fn => (...params) =>
  fn(...params).catch(error => console.log(error));

module.exports = handleError;

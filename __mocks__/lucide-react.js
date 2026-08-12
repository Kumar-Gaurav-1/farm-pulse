module.exports = new Proxy({}, {
  get: function(target, prop) {
    return function() { return null; };
  }
});

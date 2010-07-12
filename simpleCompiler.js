var base = require('./base');
var Buffer = require('buffer').Buffer;
var sys = require('sys');

module.exports = function compile(template, locals, callback) {
  
  var code = JSON.stringify(template).replace(/@[a-z$_][a-z0-9$_]*/g, function (match) {
    return '" + ' + match.substr(1) + ' + "';
  });
  eval(base(["chunks = new Array(1)", "chunks[0] = " + code, 'check()']));
  
  // // Generate the code
  // eval(base([
  //   'chunks = new Array(5);',
  //   'chunks[0] = "Hello " + planet + ", my name is ";',
  //   'execute(1, name);',
  //   'chunks[2] = " and I am ";',
  //   'execute(3, age);',
  //   'chunks[4] = " years old";',
  //   'check();'
  // ]));
  
  // Do a little currying for the user
  return locals ? compile(locals, callback): compile;
}

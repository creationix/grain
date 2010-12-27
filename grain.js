// This is a template function. It's decompiled, inserted into, and recompiled
function compile(locals, callback) {
  locals.__proto__ = module.exports.helpers;
  var position = 0, stream, chunks;
  if (!(typeof callback === 'function')) {
    if (callback instanceof process.EventEmitter) {
      stream = callback;
      callback = undefined;
    } else {
      throw new Error("Type Error: last argument must be either a callback function or stream instance");
    }
  }
  function check() {
    var pieces = [];
    while (chunks[position] && position < chunks.length) {
      if (stream) {
        pieces.push(chunks[position]);
      }
      position++;
    }
    if (stream && pieces.length > 0) {
      stream.emit('data', pieces.join(""));
    }

    if (position === chunks.length) {
      if (callback) {
        callback(null, chunks.join(""));
      }
      if (stream) {
        stream.emit('end');
      }
    }
  }
  function execute(position, fn) {
    try {
      chunks[position] = fn(function (err, result) {
        if (err) { 
          if (stream) stream.emit('error', err);
          if (callback) callback(err);
          return;
        }
        chunks[position] = result;
        check();
      });
    } catch (err) {
      if (stream) stream.emit('error', err);
      if (callback) callback(err);
    }
  }

  process.nextTick(function () {
    with(locals) {
      // INSERT GENERATED CODE HERE
    }
  });
}

// Prepare variables for quick code replacement
var base = compile.toString();
var match = base.match(/^(\s*)\/\/ INSERT GENERATED CODE HERE/m);
var indent = match[1];

// Returns full source code for a "compile" function with generated code
// inserted into it
module.exports = function insert(parts) {
  return base.substr(0, match.index) +
    indent + "// START GENERATED CODE\n" +
    indent + parts.join("\n" + indent) + "\n" +
    indent + "// END GENERATED CODE" +
    base.substr(match.index + match[0].length);
}

var Corn = require('./examples/corn');

var fn = Corn("Hello @world, today is @today().");
console.log(fn +"");
fn({world:"Earth",today:function (callback) {
  setTimeout(function () {
    callback(null, new Date());
  }, 100);
  }}, function (err, text) {
    if (err) throw err;
  console.log(text);
});
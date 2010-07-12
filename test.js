var compiler = require('./simpleCompiler');

var fn = compiler("Hello @world, today is @today");
console.log(fn +"");
fn({world:"Earth",today:new Date()}, function (err, text) {
  console.log(text);
});
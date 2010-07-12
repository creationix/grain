# Grain Templating System

All template languages have 5 parts in common.

 - Static content
 - Parameters
 - Dynamic content
 - Loops/Conditionals
 - Asynchronous parts

Ok, maybe the last one isn't that common, but in a NodeJS world where nothing blocks it's required for many use cases.  Partial templates require usually that another external resource get loaded and compiled.  If this resource is loaded over some IO then it's an asynchronous operation.  Also it would be nice to be able to stream content to the browser as information is known.

## Inversion of control

One way to handle the async nature of retrieving data is to pre-calculate all the data that's needed for a template to render, and then as the last step pass it to the template function which returns the output text in a single sync function call.  This works and is very simple from the point of view of the author of the template language, but it's a lot of burden on the person using the template language.

My proposed method is to pass the template function an hash of values and data providing functions.  The template language will call the data providers as it needs data.  If they are async functions, then it will hold that place in the template and defer rendering of that part till the callback comes back with the data.  Then the template will output it's result after the pending function calls have finished.

## Template language compiler module interface

All grain engines need to comply with this simple interface to allow interoperability between frameworks and projects.

### Compiler

The module itself is a function that takes in template source code as text and returns compiled function that renders that template on demand.

    function compile(text) -> function fn(locals, callback|stream)
    module.exports = compile

The returned function accepts two arguments, they are `locals` and then either a `callback` function or a `stream` instance.  The properties of `locals` are available within the template as local variables, usually using `with`.

### Callback

If a callback is provided it's interface will be:

    function callback(err, result) { ... }

Where `err` will contain an instance of `Error` if an exception happens while rendering, otherwise, `err` will be falsy and result will contain the final output of the entire template.

### Stream

If a stream if given instead, it will `emit("data", chunk)` as chunks of output are finished.  It will `emit('end')` when done, and `emit('error', err)` where there is an exception.

### Currying

The compile function will act as if it's a curried function and accept the locals and callback|stream parameters directly.

    function callback(text, locals, callback|stream)

### Helpers

The module itself will also have a `helpers` object that gets mixed into every locals parameter.  A simple way to implement this is on the first line of the generated code in `fn` do:

    locals.__proto__ = module.exports.helpers;

## Sample code

There is no known compiler that fully implements this yet, but see some sample code at <http://gist.github.com/468889>

More to come soon.


# Grain Templating System

All templating languages have 5 parts in common.

 - Static content
 - Parameters
 - Dynamic content
 - Loops/Conditionals
 - Asynchronous parts

Ok, maybe the last one isn't that common, but in a NodeJS world where nothing blocks it's required for many use cases.  Partial templates require usually that another external resource get loaded and compiled.  If this resource is loaded over some IO then it's an asynchronous operation.  Also it would be nice to be able to stream content to the browser as information is known.

Grain systems are simply an arrangement of pipes and filters.  The data flowing between them is typed and different filters/compilers have different input and output types.


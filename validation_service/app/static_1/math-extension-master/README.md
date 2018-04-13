Showdown's Math extension
=========================

[![Build Status](https://travis-ci.org/lucidogen/math-extension.svg)](https://travis-ci.org/lucidogen/math-extension) [![npm version](https://badge.fury.io/js/showdown-math.svg)](http://badge.fury.io/js/showdown-math) [![npm version](https://badge.fury.io/bo/showdown-math.svg)](http://badge.fury.io/bo/showdown-math) 

------

**Twitter extension for [showdown](https://github.com/showdownjs/showdown)**

Adds support for MathJax in Markdown.

Inline MathJax

    We use the constant \(\pi\) to compute the area of a circle.

Display MathJax

    Here is a multi-line equation:

    \[
    \begin{align}
    \dot{x} & = \sigma(y-x) \\
    \dot{y} & = \rho x - y - xz \\
    \dot{z} & = -\beta z + xy
    \end{align}
    \]

Dont forget to include
 
    <script type="text/javascript"
      src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_HTMLorMML">
    </script>

## Installation

### With [npm](http://npmjs.org)

    npm install showdown-math

### With [bower](http://bower.io/)

    bower install showdown-math

### Manual

You can also [download the latest release zip or tarball](https://github.com/showdownjs/math-extension/releases) and include it in your webpage, after showdown:

    <script src="showdown.min.js">
    <script src="showdown-math.min.js">

### Enabling the extension

After including the extension in your application, you just need to enable it in showdown.

    var converter = new showdown.Converter({extensions: ['math']});

## Example

```javascript
const converter = new showdown.Converter ( { extensions: [ 'math' ] } )
console.log
( converter.makeHtml ( 'This is a math formula: $$$\pi$$$' )
)
```

Should output:

```html
<p>This is a math formula: </p>
```

## License

MIT

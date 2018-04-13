# hbp-collaboratory-theme

A Bootstrap 3 Theme for HBP Collaboratory Extensions

[![Build Status](https://bbpcode.epfl.ch/ci/buildStatus/icon?job=platform.collaboratory-theme.github&build=1)](https://bbpcode.epfl.ch/ci/job/platform.collaboratory-theme.github/1/)

# Setup Collaboratory Theme

This library package the HBP theme and Bootstrap so that you don't need to
import both libraries.

## Install with Bower

Install the theme component using HBP Bower registry (http://bbpcode.epfl.ch/repositories/bower).

```
bower install hbp-collaboratory-theme
```

## Using Sass

Import `dist/sass/theme.scss`

```scss
// Assuming that `bower_components` is in your Sass import path
@import hbp-collaboratory-theme/dist/sass/theme.scss
```

## Using CSS

Link to `dist/css/bootstrap.min.css`

```
<link rel="Stylesheet" href="hbp-collaboratory-theme/dist/css/bootstrap.min.css">
```

## Javascript dependencies

A few Bootstrap components requires a counterpart javascript library. The loaded
library depends of the underlying framework.

Bootstrap jQuery plugin is included in this bundle as an optional dependency.
If you are developing an angular based application, you need to rely on
`angular-bootstrap` component instead.

### Angular JS based project

Install `ui.bootstrap`

```
bower install angular-bootstrap
```

Require the module in your application.

```js
var app = angular.module('MyApp', ['ui.bootstrap']);
```

### jQuery based proejct

Include the `bootstrap.js` library in your HTML page.

```html
<script src="./bower_components/collaboratory-theme/dist/javascripts/bootstrap.min.js">
```

# Usage

You can discover the look and feel of the theme by opening the kitchen sink page located at `./dist/examples/kitchen-sink.html`.

This is just a theme over Bootstrap so all  [Bootstrap official documentation](http://getbootstrap.com/) apply and should be considered accurate.



# Development

Run watcher and server using grunt:

```bash
grunt serve
```

You can then access a development server on http://localhost:8100.

Each time a modification is detected, the corresponding files will be
regenerated. If a Sass file is modified, the `dist` folder will be rebuilt
as well, which means that you can link this project with other Bower enable
development folder and have the change propagated.

# Credits

The project structure and build files are inspired by the [Themestrap] template.
The kitchen sink especially is a direct copy of a huge amount of work from this
project.
The main variation is that we use Bootstrap Sass instead of Less.

[Themestrap]: http://code.divshot.com/themestrap/

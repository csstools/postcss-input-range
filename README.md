# Input Range <a href="https://github.com/postcss/postcss"><img src="https://postcss.github.io/postcss/logo.svg" alt="PostCSS Logo" width="90" height="90" align="right"></a>

[![NPM Version][npm-img]][npm-url]
[![Build Status][cli-img]][cli-url]
[![Licensing][lic-image]][lic-url]
[![Changelog][log-image]][log-url]
[![Gitter Chat][git-image]][git-url]

[Input Range] lets you style input ranges with unprefixed selectors.

```css
/* before */

::range-track {
	background: #3071a9;
	width: 100%;
}

::range-thumb {
	border-radius: 3px;
	cursor: pointer;
}

/* after */

::-moz-range-track {
	background: #3071a9;
	width: 100%;
}

::-ms-track {
	background: #3071a9;
	width: 100%;
}

::-webkit-slider-runnable-track {
	background: #3071a9;
	width: 100%;
}

::-moz-range-thumb {
	border-radius: 3px;
	cursor: pointer;
}

::-ms-thumb {
	border-radius: 3px;
	cursor: pointer;
}

::-webkit-slider-thumb {
	border-radius: 3px;
	cursor: pointer;
}
```

## Supported selectors

#### `::range-track`

Styles the track of a range.

#### `::range-thumb`

Styles the thumb of a range.

#### `::range-lower`

Styles the lower track of a range before the thumb. <small>*Only supported in Firefox, Edge and IE 10+.*</small>

#### `::range-upper`

Styles the upper track of a range after the thumb. <small>*Only supported in Edge and IE 10+.*</small>

## Options

#### `method`

Type: `String`
Default: `'replace'`

##### `clone`

Copies any rules with `::range` pseudo-elements to new rules using prefixes.

```css
/* before */

::range-thumb {
	border-radius: 3px;
}

/* after */

::-moz-range-thumb {
	border-radius: 3px;
}

::-ms-thumb {
	border-radius: 3px;
}

::-webkit-slider-thumb {
	border-radius: 3px;
}

::range-thumb {
	border-radius: 3px;
}
```

##### `replace`

Copies any rules with `::range` pseudo-elements to new rules using prefixes while removing the original.

```css
/* before */

::range-thumb {
	border-radius: 3px;
}

/* after */

::-moz-range-thumb {
	border-radius: 3px;
}

::-ms-thumb {
	border-radius: 3px;
}

::-webkit-slider-thumb {
	border-radius: 3px;
}
```

##### `warn`

Warns whenever a `::range` pseudo-class is found.

#### `strict`

Type: `Boolean`
Default: `true`

##### `true`

Ignores prefixed `::range`-type pseudo-classes.

```css
/* before */

::-ms-thumb {
	border-radius: 3px;
}

/* after */

::-ms-thumb {
	border-radius: 3px;
}
```

##### `false`

Processes prefixed `::range`-type pseudo-classes.

```css
/* before */

::-ms-thumb {
	border-radius: 3px;
}

/* after */

::-moz-range-thumb {
	border-radius: 3px;
}

::-ms-thumb {
	border-radius: 3px;
}

::-webkit-slider-thumb {
	border-radius: 3px;
}
```

## Usage

Add [Input Range] to your build tool:

```bash
npm install jonathantneal/postcss-input-range --save-dev
```

#### Node

```js
require('postcss-input-range').process(YOUR_CSS, { /* options */ });
```

#### PostCSS

Add [PostCSS] to your build tool:

```bash
npm install postcss --save-dev
```

Load [Input Range] as a PostCSS plugin:

```js
postcss([
	require('postcss-input-range')({ /* options */ })
]).process(YOUR_CSS, /* options */);
```

#### Gulp

Add [Gulp PostCSS] to your build tool:

```bash
npm install gulp-postcss --save-dev
```

Enable [Input Range] within your Gulpfile:

```js
var postcss = require('gulp-postcss');

gulp.task('css', function () {
	return gulp.src('./src/*.css').pipe(
		postcss([
			require('postcss-input-range')({ /* options */ })
		])
	).pipe(
		gulp.dest('.')
	);
});
```

#### Grunt

Add [Grunt PostCSS] to your build tool:

```bash
npm install grunt-postcss --save-dev
```

Enable [Input Range] within your Gruntfile:

```js
grunt.loadNpmTasks('grunt-postcss');

grunt.initConfig({
	postcss: {
		options: {
			use: [
				require('postcss-input-range')({ /* options */ })
			]
		},
		dist: {
			src: '*.css'
		}
	}
});
```

[npm-url]: https://www.npmjs.com/package/postcss-input-range
[npm-img]: https://img.shields.io/npm/v/postcss-input-range.svg
[cli-url]: https://travis-ci.org/jonathantneal/postcss-input-range
[cli-img]: https://img.shields.io/travis/jonathantneal/postcss-input-range.svg
[lic-url]: LICENSE.md
[lic-image]: https://img.shields.io/npm/l/postcss-input-range.svg
[log-url]: CHANGELOG.md
[log-image]: https://img.shields.io/badge/changelog-md-blue.svg
[git-url]: https://gitter.im/postcss/postcss
[git-image]: https://img.shields.io/badge/chat-gitter-blue.svg

[Input Range]: https://github.com/jonathantneal/postcss-input-range
[PostCSS]: https://github.com/postcss/postcss
[Gulp PostCSS]: https://github.com/postcss/gulp-postcss
[Grunt PostCSS]: https://github.com/nDmitry/grunt-postcss

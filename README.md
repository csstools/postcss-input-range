# Input Range [![Build Status][ci-img]][ci]

<img align="right" width="135" height="95" src="http://postcss.github.io/postcss/logo-leftp.png" title="Philosopher’s stone, logo of PostCSS">

[Input Range] is a [PostCSS] plugin that allows you to style `input["range"]` with unprefixed pseudo-elements.

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

## Supported pseudo elements

**`::range-track`** styles the track of a range.

**`::range-thumb`** styles the thumb of a range.

**`::range-lower`** styles the lower track of a range. *Only supported in Edge and IE 10+.*

**`::range-upper`** styles the upper track of a range. *Only supported in Edge and IE 10+.*

## Usage

Follow these steps to use [Input Range].

Add [Input Range] to your build tool:

```bash
npm install postcss-input-range --save-dev
```

#### Node

```js
require('postcss-input-range')({ /* options */ }).process(YOUR_CSS);
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
]);
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
    return gulp.src('./css/src/*.css').pipe(
        postcss([
            require('postcss-input-range')({ /* options */ })
        ])
    ).pipe(
        gulp.dest('./css')
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
            processors: [
                require('postcss-input-range')({ /* options */ })
            ]
        },
        dist: {
            src: 'css/*.css'
        }
    }
});
```

[ci]: https://travis-ci.org/jonathantneal/postcss-input-range
[ci-img]: https://travis-ci.org/jonathantneal/postcss-input-range.svg
[Gulp PostCSS]: https://github.com/postcss/gulp-postcss
[Grunt PostCSS]: https://github.com/nDmitry/grunt-postcss
[PostCSS]: https://github.com/postcss/postcss
[Input Range]: https://github.com/jonathantneal/postcss-input-range

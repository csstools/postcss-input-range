var tests = {
	'postcss-input-range': {
		'basic': {
			message: 'supports basic usage'
		},
		'basic:clone': {
			message: 'supports "clone" method',
			options: { method: 'clone' }
		},
		'basic:replace': {
			message: 'supports "replace" method',
			options: { method: 'replace' }
		},
		'basic:warn': {
			message: 'supports "warn" method',
			options: { method: 'warn' },
			warning: 3
		},
		'vendor': {
			message: 'ignores vendor prefixes if strict'
		},
		'vendor:loose': {
			message: 'supports vendor prefixes if not strict',
			options: { strict: false }
		}
	}
};

var debug = false;
var dir   = './test/fixtures/';

var fs      = require('fs');
var path    = require('path');
var plugin  = require('../');
var test    = require('tape');

Object.keys(tests).forEach(function (name) {
	var parts = tests[name];

	test(name, function (t) {
		var fixtures = Object.keys(parts);

		t.plan(fixtures.length * 2);

		fixtures.forEach(function (fixture) {
			var message    = parts[fixture].message;
			var options    = parts[fixture].options;
			var warning    = parts[fixture].warning || 0;
			var warningMsg = message + ' (# of warnings)';

			var baseName   = fixture.split(':')[0];
			var testName   = fixture.split(':').join('.');

			var inputPath  = path.resolve(dir + baseName + '.css');
			var expectPath = path.resolve(dir + testName + '.expect.css');
			var actualPath = path.resolve(dir + testName + '.actual.css');

			var inputCSS  = fs.readFileSync(inputPath,  'utf8');
			var expectCSS = fs.readFileSync(expectPath, 'utf8');

			plugin.process(inputCSS, options).then(function (result) {
				var actualCSS = result.css;

				if (debug) fs.writeFileSync(actualPath, actualCSS);

				t.equal(actualCSS, expectCSS, message);

				t.equal(result.warnings().length, warning, warningMsg);
			});
		});
	});
});

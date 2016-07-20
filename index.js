var parser  = require('postcss-selector-parser');
var postcss = require('postcss');
var prefixi = {
	'::range-track': ['::-moz-range-track', '::-ms-track', '::-webkit-slider-runnable-track'],
	'::range-thumb': ['::-moz-range-thumb', '::-ms-thumb', '::-webkit-slider-thumb'],
	'::range-lower': ['::-moz-range-progress', '::-ms-fill-lower'],
	'::range-upper': ['::-ms-fill-upper']
};

var matcherStrict = /::(range-track|range-thumb|range-upper)/i;
var matcherLoose  = /::(range-track|range-thumb|range-upper|-moz-range-track|-ms-track|-webkit-slider-runnable-track|-moz-range-thumb|-ms-thumb|-webkit-slider-thumb|-moz-range-progress|-ms-fill-lower|-ms-fill-upper)/i;

module.exports = postcss.plugin('postcss-input-range', function (opts) {
	var method = opts && /^(clone|warn)$/i.test(opts.method || '') ? opts.method.toLowerCase() : 'replace';
	var strict = opts && 'strict' in opts ? opts.strict : true;
	var match  = strict ? matcherStrict : matcherLoose;

	return function (css, result) {
		css.walkRules(function (rule) {
			if (match.test(rule.selector) !== -1) {
				var cloned;

				parser(function (selectors) {
					selectors.each(function (selector) {
						selector.eachPseudo(function (pseudo) {
							Object.keys(prefixi).forEach(function (name) {
								var prefixes = strict ? [name] : prefixi[name].concat(name);

								if (prefixes.indexOf(pseudo.value) !== -1) {
									if (method === 'warn') result.warn(pseudo.value + ' detected', { node: rule });
									else prefixi[name].forEach(function (prefix) {
										pseudo.value = prefix;

										cloned = rule.cloneBefore({
											selector: selector.toString()
										});
									});
								}
							});
						});
					});
				}).process(rule.selector);

				if (cloned && method === 'replace') rule.remove();
			}
		});
	};
});

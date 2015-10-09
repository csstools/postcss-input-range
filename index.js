var parser  = require('postcss-selector-parser');
var postcss = require('postcss');

module.exports = postcss.plugin('postcss-input-range', function (opts) {
	var method = opts && /^(replace|warn)$/i.test(opts.method || '') ? opts.method.toLowerCase() : 'clone';

	var pseudos = {
		'::range-track': ['::-moz-range-track', '::-ms-track', '::-webkit-slider-runnable-track'],
		'::range-thumb': ['::-moz-range-thumb', '::-ms-thumb', '::-webkit-slider-thumb'],
		'::range-lower': ['::-ms-fill-lower'],
		'::range-upper': ['::-ms-fill-upper']
	};

	return function (css, result) {
		css.walkRules(function (rule) {
			if (/::range/.test(rule.selector)) {
				var parsedSelector = parser(function (selectors) {
					selectors.each(function (selector) {
						selector.eachPseudo(function (pseudo) {
							Object.keys(pseudos).forEach(function (name) {
								if (pseudo.value === name) {
									if (method === 'warn') result.warn(name + ' detected', { node: rule });
									else pseudos[name].forEach(function (prefixed) {
										pseudo.value = prefixed;

										rule.cloneBefore({
											selector: selector.toString()
										});
									});
								}
							});
						});
					});
				}).process(rule.selector);

				if (parsedSelector !== rule.selector && method === 'replace') rule.remove();
			}
		});
	};
});

'use strict';

// tooling
const parser  = require('postcss-selector-parser');
const postcss = require('postcss');

// pseudo map
const prefixi = {
	'::range-track': ['::-moz-range-track', '::-ms-track', '::-webkit-slider-runnable-track'],
	'::range-thumb': ['::-moz-range-thumb', '::-ms-thumb', '::-webkit-slider-thumb'],
	'::range-lower': ['::-moz-range-progress', '::-ms-fill-lower'],
	'::range-upper': ['::-ms-fill-upper']
};

// pseudo-class matchers
const matcherStrict = /::(range-track|range-thumb|range-lower|range-upper)/i;
const matcherLoose  = /::(range-track|range-thumb|range-lower|range-upper|-moz-range-track|-ms-track|-webkit-slider-runnable-track|-moz-range-thumb|-ms-thumb|-webkit-slider-thumb|-moz-range-progress|-ms-fill-lower|-ms-fill-upper)/i;

// plugin
module.exports = postcss.plugin('postcss-input-range', (opts) => {
	// options
	const method = opts && 'method' in opts ? opts.method : 'replace';
	const strict = opts && 'strict' in opts ? Boolean(opts.strict) : true;

	// sanitized method
	const safeMethod = (/^(clone|warn)$/i).test(method) ? method.toLowerCase() : 'replace';

	// pseudo-class matcher
	const selectorMatch = strict ? matcherStrict : matcherLoose;

	return (css, result) => {
		// walk each matching rule
		css.walkRules(selectorMatch, (rule) => {
			let cloned;

			parser((selectors) => {
				selectors.each((selector) => {
					selector.walkPseudos((pseudo) => {
						Object.keys(prefixi).forEach((name) => {
							const prefixes = strict ? [name] : prefixi[name].concat(name);

							if (prefixes.indexOf(pseudo.value) !== -1) {
								if (safeMethod === 'warn') {
									result.warn(`${ pseudo.value } detected`, {
										node: rule
									});
								} else {
									prefixi[name].forEach((prefix) => {
										pseudo.value = prefix;

										cloned = rule.cloneBefore({
											selector: selector.toString()
										});
									});
								}
							}
						});
					});
				});
			}).process(rule.selector);

			if (cloned && safeMethod === 'replace') {
				rule.remove();
			}
		});
	};
});

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

// matching expressions for pseudos
const matcherStrict = /::(range-track|range-thumb|range-upper)/i;
const matcherLoose  = /::(range-track|range-thumb|range-upper|-moz-range-track|-ms-track|-webkit-slider-runnable-track|-moz-range-thumb|-ms-thumb|-webkit-slider-thumb|-moz-range-progress|-ms-fill-lower|-ms-fill-upper)/i;

// plugin
module.exports = postcss.plugin('postcss-input-range', (opts = {}) => {
	const method = (/^(clone|warn)$/i).test(opts.method || '') ? opts.method.toLowerCase() : 'replace';
	const strict = 'strict' in opts ? opts.strict : true;
	const match  = strict ? matcherStrict : matcherLoose;

	return (css, result) => {
		css.walkRules((rule) => {
			if (match.test(rule.selector) !== -1) {
				let cloned;

				parser((selectors) => {
					selectors.walk((selector) => {
						selector.walkPseudos((pseudo) => {
							Object.keys(prefixi).forEach((name) => {
								const prefixes = strict ? [name] : prefixi[name].concat(name);

								if (prefixes.indexOf(pseudo.value) !== -1) {
									if (method === 'warn') {
										result.warn(pseudo.value + ' detected', {
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

				if (cloned && method === 'replace') {
					rule.remove();
				}
			}
		});
	};
});

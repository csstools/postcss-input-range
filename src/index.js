// tooling
import parser from 'postcss-selector-parser';

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

// mark created rules
const newMarker = Symbol();

const postcssInputRange = (opts = {}) => {
	// options
	const method = opts && 'method' in opts ? opts.method : 'replace';
	const strict = opts && 'strict' in opts ? Boolean(opts.strict) : true;

	// sanitized method
	const safeMethod = (/^(clone|warn)$/i).test(method) ? method.toLowerCase() : 'replace';

	// pseudo-class matcher
	const selectorMatch = strict ? matcherStrict : matcherLoose;

	return {
		postcssPlugin: 'postcss-input-range',
		Rule (rule, { result }) {
			let cloned;

			// walk each matching rule
			if (!selectorMatch.test(rule.selector) || rule[newMarker]) {
				return;
			}

			parser((selectors) => {
				selectors.each((selector) => {
					selector.walkPseudos((pseudo) => {
						Object.keys(prefixi).forEach((name) => {
							if (pseudo.value !== name && (strict || prefixi[name].indexOf(pseudo.value) === -1)) {
								return;
							}

							if (safeMethod === 'warn') {
								result.warn(`${ pseudo.value } detected`, {
									node: rule
								});
								return;
							}

							prefixi[name].forEach((prefix) => {
								pseudo.value = prefix;

								cloned = rule.cloneBefore({
									selector: selector.toString()
								});
								cloned[newMarker] = true;
							});

						});
					});
				});
			}).process(rule.selector);

			if (cloned && safeMethod === 'replace') {
				rule.remove();
			}
		},
	};
};

postcssInputRange.postcss = true;

export default postcssInputRange;

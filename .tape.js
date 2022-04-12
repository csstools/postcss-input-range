module.exports = {
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
		warnings: 3
	},
	'vendor': {
		message: 'ignores vendor prefixes if strict'
	},
	'vendor:loose': {
		message: 'supports vendor prefixes if not strict',
		options: { strict: false }
	}
};

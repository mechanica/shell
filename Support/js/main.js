require.config({
  paths: {
		Zepto: '../node_modules/zeptoify/lib/zepto', 
		Underscore: '../node_modules/backbone/node_modules/underscore/underscore', 
		Backbone: '../node_modules/backbone/backbone',
  },
	shim: {
		Zepto: {
			exports: 'Zepto'
		},
		Underscore: {
			exports: '_'
		},
		Backbone: {
			deps: ['Zepto', 'Underscore'],
			exports: 'Backbone'
		}
	}
});

require.config({
	packages: [
		{
			name: 'Terminal',
			location: '../modules/Terminal'
		}
	]
});

require([ 'app', 'Zepto', 'Underscore', 'Backbone' ], function (App) {

	App.initialize();

});

/*jsl:option explicit*/
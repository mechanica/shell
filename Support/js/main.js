require.config({
  paths: { 
		Zepto: '../node_modules/zeptoify/lib/zepto', 
		Underscore: 'lib/underscore', 
		Backbone: 'lib/backbone'
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

require([ 'app', 'Zepto', 'Underscore', 'Backbone' ], function (App) {

	App.initialize();

});

/*jsl:option explicit*/
define([
	'Zepto',
	'Underscore',
	'Backbone',
	'Terminal'
], function($, _, BB, Terminal){
	
	var initialize = function(){		
		addModule(Terminal);
	}
	
	var addModule = function (Module) {
		console.log(Module);
	}

	return {
		initialize: initialize
	};
	
});
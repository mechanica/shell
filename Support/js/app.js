define([
	'Zepto',
	'Underscore',
	'Backbone',
	
	'tab',
		
	'Terminal'
], function($, _, BB, Tab, Terminal){
	
	var initialize = function(){		
		addModule(Terminal);
	}
	
	var addModule = function (Module) {
		$(".tabrow").append( new Tab({ data: Module }).$el );
	}

	return {
		initialize: initialize
	};
	
});
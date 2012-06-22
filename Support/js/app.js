define([
 	'Zepto',
  'Underscore',
  'Backbone'
], function($, _, BB){
  var initialize = function(){
		var test = BB.View.extend({
			el: $('#terminal .scroller')
		});
		
		console.log(new test().$el);
  }

  return {
    initialize: initialize
  };
});
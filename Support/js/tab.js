define([
	'Zepto',
	'Underscore',
	'Backbone',
	'Mustache',
	
	'text!templates/tab.mustache'
], function($, _, BB, M, template){
	var view = BB.View.extend({
		tagName: 'li',
		
		template: template,
		
		initialize: function () {
			this.$el
					.attr( 'id', this.model.get('id') )
					.append( M.to_html( this.template, this.model.toJSON() ) )
		}
	});
	
	return view;
});
define([
	'Zepto',
	'Underscore',
	'Backbone',
	'Mustache',
	
	'text!templates/tab.mustache'
], function($, _, BB, M, template){
	
	var Content = BB.View.extend({
		className: 'content',
		
		initialize: function () {
			_.each( this.options.data, this.addOne, this);
		},
		
		addOne: function (item) {
			this.$el
					.append( item.$el )
		}
	});
	
	var View = BB.View.extend({
		tagName: 'li',
		
		template: template,
		
		initialize: function () {
			this.$el
					.attr( 'id', this.options.data.id )
					.append( M.to_html( this.template, this.options.data ) )
					.append( new Content({ data: this.options.data.content }).$el );
		}
	});
	
	return View;
});
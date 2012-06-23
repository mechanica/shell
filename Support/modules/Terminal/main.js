define([
	'Zepto',
	'Underscore',
	'Backbone',
	'Mustache',
	
	'./commands',
	
	'text!./templates/item.mustache',
	
	'Zepto/../event'
], function($, _, BB, M, knownCommands, template){
	
	// Hensel and Gretel
	var follow = function (object, path) {
		if(path.length > 1) {
			return follow(object[path[0]] || {}, path.splice(1))
		} else if (path.length === 1) {
			return object[path] || {};
		} else {
			return object;
		}
	};
	
	var Model = BB.Model.extend({
		
	});
	
	var LogCollection = BB.Collection.extend({
		model: Model
	});
	
	var Log = BB.View.extend({
		className: 'scroller',
		
		initialize: function () {
			this.collection.bind('add', this.addOne, this);
		},
		
		addOne: function ( model ) {
			this.$el
					.append( M.to_html( template, model.toJSON() ) );
		}
	});
	
	var Commandline = BB.View.extend({
		className: 'commandline',
		
		events: {
			'submit form': "onSubmit",
			'keyup input': "onKeyUp",
			'click .suggestion li': "applySuggestion",
			'keyup .suggestion li': "applySuggestion"
		},
		
		ui: {},
		
		initialize: function () {
			this.$el
					.append('<form action=""><input type="text" value=""></form>')
					.append( (this.ui.genius = new Genius()).$el );
			
			this.ui.input = this.$el.find('input');
		},
		
		onSubmit: function (e) {			
			this.collection.add({
			  user: 'enykeev',
			  hostname: 'localhost',
			  path: '~/Developer/Perosnal/Web/MyProject/',
				branch: 'master',
			  command: this.ui.input.val()
			});
			
			return false;
		},
		
		onKeyUp: function (e) {	
			switch (e.keyCode) {
				case 13:
					this.ui.input.val('');
					break;
				case 37:
				case 38:
				case 39:
				case 40:
					break;
				default:
					this.askSuggestion();
					break;
			};
		},
		
		askSuggestion: function () {
			this.ui.genius.suggest( this.ui.input.val() );
		},
		
		// [ISSUE] Here's a strange 'bump' sound happening when you picking suggestion by 
		// keyboard (Enter). Based on some tests and http://t.mech.sh/cocoa-bump-sound i 
		// assume that is a bug in Textmate Web Preview that cause improper keyboard event
		// 'consumption'. We need to test it in Textmate 2.
		applySuggestion: function (e) {
			if ( e.keyCode && e.keyCode !== 13) { return; }
			var strong = this.ui.input.val().split(' ');
			strong[strong.length-1] = ''			
			this.ui.input.val( strong.join(' ') + $(e.target).text() + ' ' );
			this.askSuggestion();
			this.ui.input.focus();
		}
	});

	var Genius = BB.View.extend({
		tagName: 'ul',
		className: 'suggestion',
		
		suggest: function ( query ) {
			query = query.split(' ');
			
			last = query.splice( query.length - 1 )[0];
						
			if ( last.length ) {
				this.render( _( follow( knownCommands, query ) )
					.chain()
					.keys()
					.filter(function (item) {
						return item.indexOf( last ) === 0;
					})
					.value() );
			} else {
				this.render();
			}

		},
		
		render: function (items) {
			this.$el
					.empty();
			
			_(items).each( this.addOne, this);
		},
		
		addOne: function (item) {
			this.$el
					.append( new Suggestion({ text: item, genius: this }).$el );
		}
	});
	
	var Suggestion = BB.View.extend({
		tagName: 'li',
		
		initialize: function () {
			this.$el
					.attr( 'tabindex', 0 )
					.text( this.options.text );
		}
	})
	
	var log = new LogCollection();

	return { 
		id: 'some', 
		name: 'Something', 
		content: [ 
			new Log({ collection: log }), 
			new Commandline({ collection: log }) 
		] 
	};
});
define([
	'Zepto',
	'Underscore',
	'Backbone',
	'Mustache',
	
	'text!./templates/item.mustache',
	
	'Zepto/../event'
], function($, _, BB, M, template){
	
	var knownCommands = {
		'ls': null,
		'ln': null,
		'cd': null,
		'npm' : [
			'adduser', 'apihelp', 'author', 'bin', 'bugs', 'c', 'cache', 'completion',
	    'config', 'deprecate', 'docs', 'edit', 'explore', 'faq', 'find', 'get',
	    'help', 'help-search', 'home', 'i', 'info', 'init', 'install', 'la', 'link',
	    'list', 'll', 'ln', 'login', 'ls', 'outdated', 'owner', 'pack', 'prefix',
	    'prune', 'publish', 'r', 'rb', 'rebuild', 'remove', 'restart', 'rm', 'root',
	    'run-script', 's', 'se', 'search', 'set', 'show', 'star', 'start', 'stop',
	    'submodule', 'tag', 'test', 'un', 'uninstall', 'unlink', 'unpublish',
	    'unstar', 'up', 'update', 'version', 'view', 'whoami'
		],
		'git' : [
			'add', 'bisect', 'branch', 'checkout', 'clone', 'commit', 'diff', 'fetch',   
			'grep', 'init', 'log', 'merge', 'mv', 'pull', 'push', 'rebase', 'reset',   
			'rm', 'show', 'status', 'tag'
		]
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
			'keyup input': "onKeyUp"
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
					this.ui.genius.suggest( this.ui.input.val() );
					break;
			};
		}
	});

	var Genius = BB.View.extend({
		tagName: 'ul',
		className: 'suggestion',
		
		suggest: function ( query ) {
			query = query.split(' ');
			
			last = query[query.length-1];
			
			if ( last.length ) {
				this.render( _(knownCommands)
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
					.append( new Suggestion({ text: item }).$el );
		}
	});
	
	var Suggestion = BB.View.extend({
		tagName: 'li',
		
		initialize: function () {
			this.$el
					.attr( 'tabindex', 0)
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
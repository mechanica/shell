/*
//
// Entity Module (deprecated)
// ==========================
// _Данный модуль поглощен интерфейсным модулем. Теперь для вывода сущностей необходимо 
// использовать представления ```_private.skull.Entity```. В данный момент, представление 
// ```_private.Entity``` используется только в модуле ```z.user.js```_
//
// Author: Kirill "Enykeev" Izotov (<enykeev@gmail.com>)	
// Required: JQuery, Backbone, Underscore
//
*/

var APP = (function (my, $, M) {
	'use strict';
	/*
	//
	// Общая для всех модулей приватная переменная
	// ---------
	// 
	// Любой модуль может добавить свое свойство в локальную переменную ```_private```
	// и оно будет немедленно доступно для остальных модулей. Когда все модули загружены,
	// приложению необходимо вызвать метод ```_seal()``` дабы предотвратить внешний доступ 
	// к переменной ```_private```. Если в процессе работы приложения появится необходимость 
	// подключить еще один модуль, любой из уже подключеных модулей может вызывать метод 
	// ```_unseal()``` перед загрузкой файла, и повторно вызвать ```_seal()``` по окончанию.
	//
	*/
	var _private = my._private = my._private || {}
		, _seal = my._seal = my._seal || function () {
				delete my._private;
				delete my._seal;
				delete my._unseal;
			}
		, _unseal = my._unseal = my._unseal || function () {
				my._private = _private;
				my._seal = _seal;
				my._unseal = _unseal;
			};	

	my.Terminal = 

	return my;
}(APP || {}, window.Zepto, window.Mustache));

/*jsl:option explicit*/
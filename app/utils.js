App.Utils = App.Utils || {};

App.Utils.Valid = (function(lng, app, undefined) {
	
	var isURL = function (s) {
		var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
		return regexp.test(s);
	};
	
	return {
		isURL: isURL
	}
	
})(LUNGO, App);

App.Services = (function(lng, app, undefined) {

	var LOAD_PRIMA_URL = "http://miralaprima.herokuapp.com/GetPrima";
	var LOAD_PHOTO_URL = "http://miralaprima.herokuapp.com/GetMoza";
	var UPLOAD_PHOTO_URL = "http://miralaprima.herokuapp.com/SetMoza";
	var LOAD_PRIMA_HISTORY_URL = "http://miralaprima.herokuapp.com/GetHistory";
	
	var _lastTimeShownConnectionError = new Date(0);
	var MINUTES_CONNECTION_ERROR = 1;
	
	var _checkConnectionDecorator = function (fn) {
		
		var newfn = function () {
			var args = _.toArray(arguments);
			if (!Device.isOnline()) {
				var xhr = {
					abort: function(){}
				};
				var now = new Date();
				now.setMinutes(now.getMinutes() - MINUTES_CONNECTION_ERROR);
				if (now > _lastTimeShownConnectionError) {
					lng.Sugar.Growl.show("Error", "Comprueba tu conexión", "warning", false, 2);
					_lastTimeShownConnectionError = new Date();
				}
				setTimeout(function() {xhr.abort();}, 100);
				return xhr;
			} else {
				return fn.apply(fn, args);
			}
		};
		return newfn;
	};
		
	var getCountriesList = function (callback) {
//		console.log("Services.getCountriesList");
		lng.Sugar.Growl.show ('Cargando', '',  'loading', true, 0);
	    return $$.get(LOAD_PRIMA_URL,
	    	{
	    		callback: '?'
	    	},
	    	function (countries_list) {
//	    		console.log("Services.getCountriesList RES:", countries_list);
	    		callback(countries_list);
	    		lng.Sugar.Growl.hide();
	    	},
	    	"json"
	    );
	};
	
	var loadPrimaValue = function (country_code, callback) {
		lng.Sugar.Growl.show ('Cargando', '',  'loading', true, 0);
//		console.log("haciendo llamada al servidor REQUEST: ", country_code);
		return $$.get(LOAD_PRIMA_URL,
	    	{
	    		country_code: country_code, 
	    		callback: '?'
	    	},
	    	function (prima_data) {
//	    		console.log("RESPONSE: ", prima_data);
	    		callback(prima_data);
	    		lng.Sugar.Growl.hide();
	    	},
	    	"json"
	    );
	};
	
	var loadPrimaPicture = function(country_code, callback) {
//		callback([]); return;
		var options = {
				callback: '?',
				limit: 10,
		};
		country_code && (options.country_code = country_code);
		
		return $$.get(LOAD_PHOTO_URL, options, callback, "json");
	};
	
	
	var uploadPrimaPicture = function (url, callback) {
		lng.Sugar.Growl.show('Subiendo', '',  'upload', true, 0);
		return $$.get(UPLOAD_PHOTO_URL,
			{
				url_moza: url,
				callback:'?'
			},
			function (response){
				if (response && response.result == "OK") {
					lng.Sugar.Growl.notify("Prima subida", "Si tu prima es aceptada pronto la verás por aquí ;-)", "check", "info", 4);
				} else {
					lng.Sugar.Growl.show("Error", "Ocurrió un error subiendo la prima al servidor", "warning", false, 5);
				}
			},
			"json"
		);
	};
	
	var loadPrimaHistory = function (country_code, limit, callback) {
		limit = limit || 7;
		lng.Sugar.Growl.show ('Cargando', '',  'loading', true, 0);
		return $$.get(LOAD_PRIMA_HISTORY_URL,
	    	{
	    		country_code: country_code,
	    		limit: limit,
	    		callback: '?'
	    	},
	    	function (prima_history) {
	    		callback(prima_history);
	    		lng.Sugar.Growl.hide();
	    	},
	    	"json"
	    );
	};
	
	$$.ajaxSettings.timeout = 10000;
	$$.ajaxSettings.error = function (xhr, type) {
		lng.Sugar.Growl.show("Error", "Falló la conexión con el servidor", "warning", false, 3);
	};
	
	return {
		getCountriesList: _checkConnectionDecorator(getCountriesList),
		loadPrimaValue: _checkConnectionDecorator(loadPrimaValue),
		loadPrimaPicture: loadPrimaPicture,
		uploadPrimaPicture: uploadPrimaPicture,
		loadPrimaHistory: loadPrimaHistory
	}

})(LUNGO, App);


App.Services = (function(lng, app, undefined) {
    var CONST = {
        LOAD_PRIMA_URL: "http://miralaprima.herokuapp.com/GetPrima",
        LOAD_PHOTO_URL: "http://miralaprima.herokuapp.com/GetMoza",
        UPLOAD_PHOTO_URL: "http://miralaprima.herokuapp.com/SetMoza",
        LOAD_PRIMA_HISTORY_URL: "http://miralaprima.herokuapp.com/GetHistory"
    };

    var _lastTimeShownConnectionError = new Date(0);
    var MINUTES_CONNECTION_ERROR = 1;

    var _checkConnectionDecorator = function (fn) {

        var newfn = function () {
            var args = _.toArray(arguments);
            if (typeof Device !== "undefined" && !Device.isOnline()) {
                var xhr = {
                    abort: function(){}
                };
                var now = new Date();
                now.setMinutes(now.getMinutes() - MINUTES_CONNECTION_ERROR);
                if (now > _lastTimeShownConnectionError) {
                    lng.Notification.error(t("error"), t("check-connection"), "warning-sign", 3);
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

    /**
     * callback called with callback([
     *     {
     *         name: "España",
     *         country_code: "ES",
     *         prima_value: 400,
     *         prima_delta: 3,
     *         prima_percent: 2.25
     *     },
     *     {
     *         name: "Italia",
     *         country_code: "IT",
     *         prima_value: 300,
     *         prima_delta: -2,
     *         prima_percent: -2.5
     *     }
     *     ...
     * ]);
     */
    var getCountriesList = function (callback) {
        App.Notification.show();
        return cache(CONST.LOAD_PRIMA_URL,
            {},
            "10 minutes",
            function (countries_list) {
                callback(countries_list);
                App.Notification.hide();
            }
        );
    };

    var loadPrimaValue = function (country_code, callback) {
        App.Notification.show();
        return get(CONST.LOAD_PRIMA_URL,
            {
                country_code: country_code
            },
            function (prima_data) {
                callback(prima_data);
                App.Notification.hide();
            }
        );
    };

    var loadPrimaPicture = function(country_code, callback) {
        var options = {
            limit: 10,
            safesearch: navigator.config.photos.safeSearch
        };
        country_code && (options.country_code = country_code);
        App.Notification.show();
        var xhr = get(CONST.LOAD_PHOTO_URL, options, function(res) {
            callback.call(callback, res);
            for (var i = 0; i < xhr._listeners.length; i++) {
                var listener = xhr._listeners[i];
                listener.call(listener, res);
            }
            App.Notification.hide();
        });

        xhr._listeners = [];
        xhr.whenLoaded = function (cb) {
            xhr._listeners.push(cb);
        };
        return xhr;
    };


    var uploadPrimaPicture = function (url, callback) {
        App.Notification.show("upload", t("uploading"), 0);
        return get(CONST.UPLOAD_PHOTO_URL,
            {
                url_moza: url
            },
            function (response){
                App.Notification.hide();
                if (response && response.result === "OK") {
                    lng.Notification.success(t("photo-uploaded"), t("photo-uploaded-success-msg"), "check", 4);
                } else {
                    lng.Notification.error(t("error"), t("photo-uploaded-error-msg"), "warning-sign", 5);
                }
            }
        );
    };

    var loadPrimaHistory = function (country_code, limit, callback) {
        limit = limit || 7;
        // setTimeout(function () {
        //     callback([3, 1, 2, 2, 6, 3, 7, 5]);
        // }, 200);
        // return;
        return cache(CONST.LOAD_PRIMA_HISTORY_URL,
            {
                country_code: country_code,
                limit: limit
            },
            "10 minutes",
            callback
        );
    };

    var cache = function (url, data, time, callback) {
        var serializedData = $$.serializeParameters(data);
        url = url + '?callback=?' + '&' + serializedData;
        return Lungo.Service.cache(url, {}, time, callback, 'jsonp');
    };

    var get = function (url, data, callback) {
        var serializedData = $$.serializeParameters(data);
        url = url + '?callback=?' + '&' + serializedData;
        return Lungo.Service.get(url, {}, callback, 'jsonp');
    };

    $$.ajaxSettings.timeout = 5000;
    $$.ajaxSettings.error = function (xhr, type) {
        App.Notification.hide();
        lng.Notification.error(t("error"), t("server-connection-failure-msg"), "warning-sign", 3);
    };

    return {
        getCountriesList: _checkConnectionDecorator(getCountriesList),
        loadPrimaValue: _checkConnectionDecorator(loadPrimaValue),
        loadPrimaPicture: loadPrimaPicture,
        uploadPrimaPicture: uploadPrimaPicture,
        loadPrimaHistory: loadPrimaHistory,
        CONST: CONST
    };

})(Lungo, App);

App.Data = (function(lng, app, undefined) {
    var MINUTES_REFRESH = 2;
    
    lng.Data.Sql.init({
        name : 'prima-db',
        version : '1.0',
        schema : [ {
            name : 'countries',
            drop : false,
            fields : {
                id : 'INTEGER PRIMARY KEY',
                name : 'TEXT',
                country_code : 'TEXT',
                prima_value : 'FLOAT',
                prima_delta : 'FLOAT',
                prima_percent : 'FLOAT',
                last_update : 'DATETIME'
            }
        },
        {
            name : 'favourites',
            drop : false,
            fields : {
                id : 'INTEGER PRIMARY KEY',
                country_code: 'TEXT'
            }
        }]
    });
    
    var isOutOfDate = function(datetime) {
        var t = new Date(datetime);
        t.setMinutes(t.getMinutes() + MINUTES_REFRESH);
        return ( t < new Date() );
    };
    
    var getCountry = function (country_code, callback, force_update) {
//      console.log("doing DB query: REQUEST:", country_code);
        lng.Data.Sql.select("countries", {"country_code": country_code}, function (dbres) {
            if (dbres && dbres.length > 0 && ! force_update && ! isOutOfDate(dbres[0].last_update)) {
//              console.log("DB RESULT:", dbres);
                lng.Data.Cache.set("current_country", dbres[0]);
                callback(dbres[0]);
            } else {
//              console.log("NO DB RESULT:", dbres);
                var xhr = app.Services.loadPrimaValue(country_code, function (srvres) {
                    if (srvres) {
//                      console.log("SRV RESULT:", srvres);
                        saveCountries(srvres);
                        lng.Data.Cache.set("current_country", srvres);
                        callback(srvres);
                    } else {
//                      console.log("NO SRV RESULT:", srvres);
                        lng.Data.Cache.set("current_country", {"country_code": country_code});
                        callback(srvres);
                    }
                });
                var oldabort = xhr.abort;
                xhr.abort = function() {
                    if (dbres && dbres.length > 0) {
                        callback(dbres[0]);
                    }
                    oldabort();
                };
            }
        });
    };
    
    var getCountriesList = function (callback, force_update) {
        lng.Data.Sql.select("countries", null, function(dbres){
            var oldest = _.min(dbres, function(country) { return country.last_update; });
//          console.log("oldest:", oldest);
            if (dbres && dbres.length > 0 && ! force_update && ! isOutOfDate(oldest.last_update)) {
                callback(dbres);
            } else {
//              console.log("loading country list from server");
                var xhr = app.Services.getCountriesList(function (srvres) {
                    if (srvres) {
                        saveCountries(srvres);
                        callback(srvres);
                    } else if (dbres && dbres.length > 0) {
                        callback(dbres);
                    }
                });
                
                var oldabort = xhr.abort;
                xhr.abort = function() {
                    if (dbres && dbres.length > 0) {
                        callback(dbres);
                    }
                    oldabort();
                };
            }
        });
    };


    var insertOrUpdate = function(table, conditions, data) {
        data = _.pick(data, "name", "prima_value", "prima_percent", "prima_delta", "country_code");
        lng.Data.Sql.select(table, conditions, function(dbres){
            if (dbres && dbres.length > 0) {
                lng.Data.Sql.update(table, data, conditions);
            } else {
                lng.Data.Sql.insert(table, data);
            }
        });
    };
    
    var saveCountries = function (countries) {
//      console.log("saving countries", countries);
        var now = (new Date()).valueOf();
        if (_.isArray(countries)) {
            var len, i;
            for (i=0, len=countries.length; i<len; i++) {
                var country = countries[i];
//              console.log("saving country", country);
                country.last_update = now;
                insertOrUpdate("countries", {"country_code": country.country_code}, country);
            }
        } else {
            countries.last_update = now;
            insertOrUpdate("countries", {"country_code": countries.country_code}, countries);
        }
    };
    
    var addFavourite = function (country_code) {
        lng.Data.Sql.select("favourites", {country_code: country_code}, function(dbres) {
            if (!dbres || dbres.length === 0 ) {
                lng.Data.Sql.insert("favourites", {country_code: country_code});
            }
        });
    };
    
    var getFavourites = function (callback, force_update) {
        lng.Data.Sql.select("favourites", null, function(favourites) {
            var fav_list = [];
            var recollected = 0;
            var len = favourites.length;
            if (len === 0) {
                callback([]);
            } else {
                for (var i=0; i<len; i++) {
                    country_code = favourites[i].country_code;
                    getCountry(country_code, function (country) {
                        fav_list.push(country);
                        recollected ++;
                        if (recollected === len) {
                            callback(fav_list);
                        }
                    }, force_update);
                }
            }
        });
    };
    
    var removeFavourite = function (country_code) {
        lng.Data.Sql.drop("favourites", {country_code: country_code});
    };
    
    return {
        getCountry : getCountry,
        saveCountries : saveCountries,
        addFavourite: addFavourite,
        removeFavourite: removeFavourite,
        getFavourites: getFavourites,
        getCountriesList: getCountriesList
    };

})(Lungo, App);
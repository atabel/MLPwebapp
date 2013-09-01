root = exports ? this

COUNTRY_CODES = App.Const.LS_COUNTRY_CODE_LIST_KEY

class CountryPersistCtrl extends Monocle.Controller

    @countryToObj: (country) ->
        countryObj = {}
        for attribute in __Model.Country.attributes
            countryObj[attribute] = country[attribute]
        countryObj

    constructor: ->
        super
        __Model.Country.bind 'create', @bindCountryCreate
        __Model.Country.bind 'change', @bindCountryChange
        __Model.Country.bind 'delete', @bindCountryDelete



    bindCountryCreate: (country) =>
        App.Persist.set country.country_code, @constructor.countryToObj(country)

        #update country code list
        countryCodeList = App.Persist.get(COUNTRY_CODES) ? []
        console.error 'country code list ', countryCodeList
        if countryCodeList.indexOf(country.country_code) < 0
            countryCodeList.push country.country_code
        App.Persist.set COUNTRY_CODES, countryCodeList


    bindCountryChange: (country) =>
        App.Persist.set country.country_code, @constructor.countryToObj(country)


    bindCountryDelete: (country) =>
        App.Persist.del country.country_code

        #update country code list
        countryCodeList = App.Persist.get(COUNTRY_CODES) ? []
        countryCodeList = _.without countryCodeList, country.country_code
        App.Persist.set COUNTRY_CODES, countryCodeList




__Controller.CountryLst = new CountryPersistCtrl 'body'
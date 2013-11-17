root = exports ? this

COUNTRY_CODES = App.Const.LS_COUNTRY_CODE_LIST_KEY

class CountryLstCtrl extends Monocle.Controller

    # events:
    #   "tap li.country-li": "onClickLi"

    constructor: ->
        super
        @loadFromLocalStorage()

        __Model.Country.bind 'create', @bindCountryCreate
        __Model.Country.bind 'change', @bindCountryChange

        @updateAllCoutriesLst()

        @updateCountriesFromServer()

        pdr = new Lungo.Element.Pull('section#section-main article',
            onPull: 'Tira hacia abajo para actualizar...'
            onRelease: 'Suelta para actualizar...'
            onRefresh: 'Cargando...'
            callback: =>
                @updateCountriesFromServer ->
                    setTimeout pdr.hide, 1000
        )

    loadFromLocalStorage: ->
        countryCodesList = App.Persist.get(COUNTRY_CODES) ? []
        for country_code in countryCodesList
            attributes = App.Persist.get country_code
            __Model.Country.updateOrCreate attributes


    updateCountriesFromServer: (callback) ->
        root.App.Services.getCountriesList (countries) ->
            for attributes in countries
                __Model.Country.updateOrCreate attributes

            callback?()

    bindCountryCreate: (country) =>
        @

    bindCountryChange: (country) =>
        @updateAllCoutriesLst()


    updateAllCoutriesLst: ->
        sorter = (c) -> -c.prima_value
        countries = __Model.Country.all()
        sortedCountries = _.sortBy countries, sorter
        @updateCountriesLst sortedCountries, 'article#all-primas ul'

        countries = __Model.Country.favourites()
        sortedCountries = _.sortBy countries, sorter
        @updateCountriesLst sortedCountries, 'article#favourite-primas ul'
        Lungo.Element.count '#favourites-tab-btn', countries.length


    updateCountriesLst: (countries, container) ->
        first = true
        for uid, country of countries
            view = new __View.Countryli model: country, container: container
            method = (if first then 'html' else 'append')
            view[method] country
            first = false




__Controller.CountryLst = new CountryLstCtrl 'article#all-primas'
class CountryActiveCtrl extends Monocle.Controller
    
    # events:
    #     "load section#section-prima-country": "onLoadSection"

    constructor: ->
        __Model.Country.bind "change", @bindCountryChange
        __Model.Country.bind "active", @refreshActive


    bindCountryChange: (country) =>
        if country.isActive()
            @refreshActive country

    refreshActive: (country) ->
        view = new __View.CountryPrima model: country
        view.html country


__Controller.CountryActive = new CountryActiveCtrl "section#section-prima-country"
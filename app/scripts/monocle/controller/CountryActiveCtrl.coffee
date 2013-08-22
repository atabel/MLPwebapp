class CountryActiveCtrl extends Monocle.Controller

    # events:
    #     "load section#section-prima-country": "onLoadSection"

    constructor: ->
        __Model.Country.bind "change", @bindCountryChange
        __Model.Country.bind "active", @refreshActive


    bindCountryChange: (country) =>
        if country.isActive()
            @refreshActive country

    refreshActive: (country) =>
        view = __View.CountryPrima.getInstance model: country
        view.html country
        @loadHistory country

    loadHistory: (country) ->
        cc = country.country_code
        App.Services.loadPrimaHistory cc, null, (history) ->
            console.error "loading chart"
            $chart = Monocle.Dom ".prima-chart"
            $chart.hide().text(history.reverse().join())
            $chart.peity "line",
                "width" : Math.floor $$(".prima").width()
                "height" : Math.floor $$(".prima").height()
            $chart.show()



__Controller.CountryActive = new CountryActiveCtrl "section#section-prima-country"
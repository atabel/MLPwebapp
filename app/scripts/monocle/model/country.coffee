class __Model.Country extends Monocle.Model
    @fields 'name',
            'country_code',
            'prima_value',
            'prima_delta',
            'prima_percent',
            'last_update',
            'favourite'

    @favourites: ->
        @select (country) -> !!country.favourite

    @setActive: (country) ->
        @_active = country
        country.trigger 'active'

    @getActive: () ->
        @_active

    @updateOrCreate: (attributes) ->
        country = @findBy 'country_code', attributes.country_code
        if not country
            __Model.Country.create attributes
        else
            country.updateAttributes attributes

    primaIsGrowing: () -> !!(@prima_delta > 0)

    prima_delta_abs: () -> '' + Math.abs @prima_delta

    prima_percent_abs: () -> '' + Math.abs @prima_percent

    active: () ->
        __Model.Country.setActive @

    isActive: () -> @equal @constructor.getActive()

    toggleFavourite: () ->
        @updateAttributes favourite: !@favourite
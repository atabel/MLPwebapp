root = exports ? this

root.App = ((lng) ->
    #Define the LungoJS Application Instance
    lng.init
        name: "Mira la Prima"
        version: "2.0"
        resources: [
            "app/resources/sections/country.html"
            "app/resources/sections/uploadprima.html"
            "app/resources/sections/about.html"
        ]

    lng.ready ->
        if root.Device.isFree()
            $$("#section-prima-country .country-view-mode").hide()
            $$("#section-prima-country footer").addClass "transparent-footer"
            $$("body").addClass "free-version"
        
        root.App.Services.getCountriesList (countries) ->
            console.log "all the countries: ", countries
            for country in countries
                __Model.Country.create(country)

        root.carousel_example = Lungo.Sugar.Carousel $$('[data-control=carousel]')[0], (index, element) ->
            count_slides = $$('[data-control=carousel] img').length
            if index == (count_slides - 2)
                root.App.PhotoManager.getPhoto null, (photo) ->
                    new_slide = "<div align='center'>" + photo.img.outerHTML + "</div>"
                    root.carousel_example.append new_slide

        for i in [0..5]
            root.App.PhotoManager.getPhoto null, (photo) ->
                new_slide = "<div align='center'>" + photo.img.outerHTML + "</div>"
                root.carousel_example.append new_slide
    

    unless lng.Core.environment().isMobile
        $$("#share-btn").parent().hide()
        $$("body").addClass "not-mobile"

    # lng.Events.init
    #     'load section#section-upload-prima': -> console.error "loaded section"

    {}
)(Lungo)
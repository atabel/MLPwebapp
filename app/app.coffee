root = exports ? this

Lungo.Data.Storage = Lungo.Data.Storage or {}
Lungo.Data.Storage.persistent = (key, value=null) ->
  if value is null
    Lungo.Cache.get key
  else
    Lungo.Cache.set key, value



root.App = do (lng = Lungo) ->

    init = () ->
        initApp()
        configPeity()

        lng.ready ->
            # initCountryDB()
            initCarousel()
            App.Animations.init()
            if root.Device?.isFree()
                $$("#section-prima-country .country-view-mode").hide()
                $$("#section-prima-country footer").addClass "transparent-footer"
                $$("body").addClass "free-version"


    initApp = () ->
        #Define the LungoJS Application Instance
        console.warn "starting app..."
        lng.init
            name: "Mira la Prima"
            version: "2.0"
            resources: [
                "app/resources/sections/country.html"
                "app/resources/sections/uploadprima.html"
                "app/resources/sections/about.html"
            ]


    initCarousel = () ->
        carouselEl = $$('[data-control=carousel]').first()
        photoContainerEl = carouselEl.children().first()
        loadedSlides = 0
        for i in [0..4]
            root.App.PhotoManager.getPhoto null, (photo) ->
                newSlide = "<div align='center'>" + photo.img.outerHTML + "</div>"
                photoContainerEl.append newSlide
                loadedSlides += 1
                console.warn 'loaded ' + loadedSlides + ' slides'
                if loadedSlides is 5
                    createCarousel carouselEl


    configPeity = () ->
        $$.fn.peity.defaults.line = {
            colour: "rgba(5,184,226,0.3)",
            strokeColour: "rgba(0,98,172,0.8)",
            strokeWidth: 3,
            delimiter: ",",
            height: 50,
            max: null,
            min: 99999,
            width: 200
        }


    createCarousel = () ->
        carouselEl = $$('[data-control=carousel]').first()
        photoContainerEl = carouselEl.children().first()
        root.carousel_example = Lungo.Element.Carousel carouselEl[0], (index, element) ->
            countSlides = carouselEl.find('img').length
            $$("#debug").text "Slide " + index + "of " + countSlides;
            if index >= (countSlides - 2)
                root.App.PhotoManager.getPhotos null, 5, (photos) ->
                    for photo in photos
                        newSlide = "<div align='center'>" + photo.img.outerHTML + "</div>"
                        photoContainerEl.append newSlide
                    root.carousel_example.refresh()
        Lungo.Events.init
            "load section#section-prima-country": ->
                console.warn "refreshing carousel ", carousel_example
                root.carousel_example.refresh()



    unless lng.Core.environment().isMobile
        lng.dom("#share-btn").parent().hide()
        lng.dom("body").addClass "not-mobile"

    init()

    {}
class AsideCtrl extends Monocle.Controller

    events:
        "tap #add-to-fav-btn": "onAddToFav"
        "tap #photo-provider-link": "onPhotoLink"

    onAddToFav: ->
        country = __Model.Country.getActive()
        country.toggleFavourite()

    onPhotoLink: ->
        carousel = Monocle.Dom '[data-control=carousel]'
        firstImg = carousel.find('img')[0].src
        url = carousel.data('url') ? firstImg
        console.log "carousel", carousel, "img", firstImg, "dataurl", carousel.data('url'),"url", url
        window.open url, '_blank'



__Controller.AsideCountryActive = new AsideCtrl "aside#menu-prima-country"
class AsideCtrl extends Monocle.Controller

    @getCurrentPhoto: ->
        carousel = Monocle.Dom '[data-control=carousel]'
        firstImg = carousel.find('img')[0].src
        carousel.data('url') ? firstImg

    events:
        'tap #add-to-fav-btn': 'onAddToFav'
        'tap #photo-provider-link': 'onPhotoLink'
        'tap #share-btn': 'onShare'

    onAddToFav: ->
        country = __Model.Country.getActive()
        country.toggleFavourite()

    onPhotoLink: ->
        href = @constructor.getCurrentPhoto()
        if MozActivity
            openURL = new MozActivity
                name: 'view'
                data:
                    type: 'url'
                    url: href
        else
            window.location.href = href

    onShare: ->
        country = __Model.Country.getActive()
        country_name = country.name;
        prima_value = country.prima_value;
        photo_url = @constructor.getCurrentPhoto()
        Device.share
            countryName: country_name
            primaValue: prima_value
            photoUrl: photo_url




__Controller.AsideCountryActive = new AsideCtrl 'aside#menu-prima-country'
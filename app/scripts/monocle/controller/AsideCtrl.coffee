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
        window.open @constructor.getCurrentPhoto(), '_blank'

    onShare: ->
        country = __Model.Country.getActive()
        country_name = country.name;
        prima_value = country.prima_value;
        photo_url = @constructor.getCurrentPhoto()
        Device.share 'La prima de ' + country_name + ' está en ' + prima_value + '. Pero esta prima si que tiene riesgo:\n'+photo_url+'\nMás primas en http://bit.ly/PFx7p2'




__Controller.AsideCountryActive = new AsideCtrl 'aside#menu-prima-country'
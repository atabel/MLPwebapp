class AsideCtrl extends Monocle.Controller
	
	events:
		"tap #add-to-fav-btn": "onAddToFav"

	onAddToFav: ->
		country = __Model.Country.getActive()
		country.toggleFavourite()



__Controller.AsideCountryActive = new AsideCtrl "aside#menu-prima-country"
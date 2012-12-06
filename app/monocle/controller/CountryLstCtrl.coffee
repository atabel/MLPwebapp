root = exports ? this

class CountryLstCtrl extends Monocle.Controller

	# events:
	# 	"tap li.country-li": "onClickLi"

	constructor: ->
		super
		__Model.Country.bind "create", @bindCountryCreate
		__Model.Country.bind "change", @bindCountryChange
		pdr = new Lungo.Element.Pull("section#section-main article",
			onPull: "Tira hacia abajo para actualizar..."
			onRelease: "Suelta para actualizar..."
			onRefresh: "Cargando..."
			callback: ->
				root.App.Services.getCountriesList (countries) ->
					pdr.hide()
		)

	bindCountryCreate: (country) =>
		console.log "created country: ", country
		@

	bindCountryChange: (country) =>
		@updateAllCoutriesLst()


	updateAllCoutriesLst: ->
		sorter = (c) -> -c.prima_value
		countries = __Model.Country.all()
		sortedCountries = _.sortBy countries, sorter
		@updateCountriesLst sortedCountries, "article#all-primas ul"

		countries = __Model.Country.favourites()
		sortedCountries = _.sortBy countries, sorter
		@updateCountriesLst sortedCountries, "article#favourite-primas ul"
		Lungo.Element.count "#favourites-tab-btn", countries.length


	updateCountriesLst: (countries, container) ->
		first = true
		for uid, country of countries
			view = new __View.Countryli model: country, container: container
			method = (if first then "html" else "append")
			view[method] country
			first = false




__Controller.CountryLst = new CountryLstCtrl "article#all-primas"